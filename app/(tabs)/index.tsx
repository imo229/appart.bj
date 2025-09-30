
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties, featuredProperties, cities } from '@/data/mockProperties';
import { Property } from '@/types/Property';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderFeaturedProperty = (property: Property) => (
    <Pressable
      key={property.id}
      style={styles.featuredCard}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <Image source={{ uri: property.images[0] }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <View style={commonStyles.priceTag}>
          <Text style={commonStyles.priceText}>
            {property.price.toLocaleString()} {property.currency}/nuit
          </Text>
        </View>
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTitle}>{property.title}</Text>
          <View style={styles.locationRow}>
            <IconSymbol name="location" size={16} color={colors.card} />
            <Text style={styles.locationText}>
              {property.location.district}, {property.location.city}
            </Text>
          </View>
          <View style={styles.ratingRow}>
            <IconSymbol name="star.fill" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {property.rating} ({property.reviewCount} avis)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderQuickFilter = (city: string) => (
    <Pressable
      key={city}
      style={styles.quickFilterButton}
      onPress={() => router.push(`/(tabs)/search?city=${city}`)}
    >
      <Text style={styles.quickFilterText}>{city}</Text>
    </Pressable>
  );

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
          <View style={commonStyles.priceTag}>
            <Text style={commonStyles.priceText}>
              {property.price.toLocaleString()} FCFA
            </Text>
          </View>
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
        <View style={styles.ratingRow}>
          <IconSymbol name="star.fill" size={14} color="#FFD700" />
          <Text style={[commonStyles.textLight, { marginLeft: 4 }]}>
            {property.rating} ({property.reviewCount} avis)
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Location Bénin',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600', fontFamily: 'Montserrat_600SemiBold' },
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Trouvez votre logement idéal</Text>
          <Text style={commonStyles.textLight}>
            Villas et appartements meublés au Bénin
          </Text>
        </View>

        {/* Search Bar */}
        <View style={commonStyles.section}>
          <Pressable 
            style={commonStyles.searchContainer}
            onPress={() => router.push('/(tabs)/search')}
          >
            <IconSymbol name="magnifyingglass" size={20} color={colors.textLight} />
            <Text style={[styles.searchPlaceholder, { marginLeft: 12 }]}>
              Rechercher par ville, quartier...
            </Text>
          </Pressable>
        </View>

        {/* Quick Filters */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Villes populaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickFiltersContainer}>
              {cities.slice(0, 5).map(renderQuickFilter)}
            </View>
          </ScrollView>
        </View>

        {/* Featured Properties */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Propriétés en vedette</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.featuredContainer}>
              {featuredProperties.map(renderFeaturedProperty)}
            </View>
          </ScrollView>
        </View>

        {/* Recent Properties */}
        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Dernières annonces</Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </Pressable>
          </View>
          {mockProperties.slice(0, 3).map(renderPropertyCard)}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: colors.textLight,
    fontFamily: 'OpenSans_400Regular',
  },
  quickFiltersContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  quickFilterButton: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickFilterText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
  },
  featuredContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    justifyContent: 'space-between',
  },
  featuredInfo: {
    alignSelf: 'stretch',
  },
  featuredTitle: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    color: colors.card,
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'OpenSans_400Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.card,
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'OpenSans_400Regular',
  },
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
  propertyDetails: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
  },
});
