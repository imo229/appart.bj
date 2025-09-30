
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Linking,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/Property';

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.text}>Propriété non trouvée</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${property.owner.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${property.owner.email}?subject=Demande de location - ${property.title}`);
  };

  const renderAmenity = (amenity: string, index: number) => (
    <View key={index} style={styles.amenityItem}>
      <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
      <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>{amenity}</Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: property.title,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600' },
          headerBackTitle: 'Retour',
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
            ))}
          </ScrollView>
          
          {/* Image Indicator */}
          <View style={styles.imageIndicator}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  { backgroundColor: index === currentImageIndex ? colors.card : 'rgba(255, 255, 255, 0.5)' }
                ]}
              />
            ))}
          </View>

          {/* Price Tag */}
          <View style={styles.priceContainer}>
            <View style={commonStyles.priceTag}>
              <Text style={commonStyles.priceText}>
                {property.price.toLocaleString()} {property.currency}/nuit
              </Text>
            </View>
          </View>
        </View>

        {/* Property Info */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>{property.title}</Text>
          
          <View style={styles.locationRow}>
            <IconSymbol name="location" size={18} color={colors.textLight} />
            <Text style={[commonStyles.text, { marginLeft: 8 }]}>
              {property.location.address}, {property.location.district}, {property.location.city}
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <IconSymbol name="star.fill" size={18} color="#FFD700" />
            <Text style={[commonStyles.text, { marginLeft: 8 }]}>
              {property.rating} ({property.reviewCount} avis)
            </Text>
          </View>
        </View>

        {/* Property Details */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Détails</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <IconSymbol name="bed.double" size={24} color={colors.primary} />
              <Text style={styles.detailNumber}>{property.bedrooms}</Text>
              <Text style={commonStyles.textLight}>Chambres</Text>
            </View>
            <View style={styles.detailCard}>
              <IconSymbol name="drop" size={24} color={colors.primary} />
              <Text style={styles.detailNumber}>{property.bathrooms}</Text>
              <Text style={commonStyles.textLight}>Salles de bain</Text>
            </View>
            <View style={styles.detailCard}>
              <IconSymbol name="square" size={24} color={colors.primary} />
              <Text style={styles.detailNumber}>{property.area}</Text>
              <Text style={commonStyles.textLight}>m²</Text>
            </View>
            <View style={styles.detailCard}>
              <IconSymbol name="house" size={24} color={colors.primary} />
              <Text style={styles.detailNumber}>{property.type === 'villa' ? 'Villa' : 'Appart.'}</Text>
              <Text style={commonStyles.textLight}>Type</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Description</Text>
          <Text style={commonStyles.text}>{property.description}</Text>
        </View>

        {/* Amenities */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Équipements</Text>
          <View style={styles.amenitiesContainer}>
            {property.amenities.map(renderAmenity)}
          </View>
        </View>

        {/* Owner Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Propriétaire</Text>
          <View style={commonStyles.card}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerAvatar}>
                <Text style={styles.ownerInitial}>
                  {property.owner.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.ownerDetails}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {property.owner.name}
                </Text>
                <Text style={commonStyles.textLight}>Propriétaire</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Contact Buttons */}
      <View style={styles.contactContainer}>
        <Pressable style={styles.contactButton} onPress={handleCall}>
          <IconSymbol name="phone.fill" size={20} color={colors.card} />
          <Text style={styles.contactButtonText}>Appeler</Text>
        </Pressable>
        <Pressable style={[styles.contactButton, styles.emailButton]} onPress={handleEmail}>
          <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
          <Text style={[styles.contactButtonText, { color: colors.primary }]}>Email</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  propertyImage: {
    width: width,
    height: 300,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  priceContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginVertical: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ownerInitial: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '600',
  },
  ownerDetails: {
    flex: 1,
  },
  contactContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contactButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  emailButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  contactButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
