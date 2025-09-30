
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/Property';

export default function FavoritesScreen() {
  // For demo purposes, we'll show the first 2 properties as favorites
  const [favoriteProperties] = useState<Property[]>(mockProperties.slice(0, 2));

  const renderPropertyCard = (property: Property) => (
    <Pressable
      key={property.id}
      style={commonStyles.propertyCard}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
      <View style={styles.propertyContent}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Pressable style={styles.favoriteButton}>
            <IconSymbol name="heart.fill" size={20} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.locationRow}>
          <IconSymbol name="location" size={14} color={colors.textLight} />
          <Text style={[commonStyles.textLight, { marginLeft: 4 }]}>
            {property.location.district}, {property.location.city}
          </Text>
        </View>
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <IconSymbol name="bed.double" size={16} color={colors.textLight} />
            <Text style={commonStyles.textLight}>{property.bedrooms} ch.</Text>
          </View>
          <View style={styles.detailItem}>
            <IconSymbol name="drop" size={16} color={colors.textLight} />
            <Text style={commonStyles.textLight}>{property.bathrooms} sdb</Text>
          </View>
          <View style={styles.detailItem}>
            <IconSymbol name="square" size={16} color={colors.textLight} />
            <Text style={commonStyles.textLight}>{property.area}m²</Text>
          </View>
        </View>
        <View style={styles.priceRow}>
          <View style={commonStyles.priceTag}>
            <Text style={commonStyles.priceText}>
              {property.price.toLocaleString()} FCFA/nuit
            </Text>
          </View>
          <View style={styles.ratingRow}>
            <IconSymbol name="star.fill" size={14} color="#FFD700" />
            <Text style={[commonStyles.textLight, { marginLeft: 4 }]}>
              {property.rating}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Mes Favoris',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600', fontFamily: 'Montserrat_600SemiBold' },
        }}
      />
      
      <View style={commonStyles.content}>
        {favoriteProperties.length > 0 ? (
          <>
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
                {favoriteProperties.length} propriété{favoriteProperties.length > 1 ? 's' : ''} sauvegardée{favoriteProperties.length > 1 ? 's' : ''}
              </Text>
            </View>
            
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={commonStyles.section}>
                {favoriteProperties.map(renderPropertyCard)}
              </View>
              <View style={{ height: 40 }} />
            </ScrollView>
          </>
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="heart" size={64} color={colors.textLight} />
            <Text style={[commonStyles.title, { textAlign: 'center', marginTop: 24 }]}>
              Aucun favori
            </Text>
            <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8, marginBottom: 32 }]}>
              Ajoutez des propriétés à vos favoris pour les retrouver facilement
            </Text>
            <Pressable
              style={styles.exploreButton}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={styles.exploreButtonText}>Explorer les propriétés</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  propertyImage: {
    width: '100%',
    height: 180,
  },
  propertyContent: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  propertyTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    color: colors.text,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
  },
});
