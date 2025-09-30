
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties, cities, amenitiesList } from '@/data/mockProperties';
import { Property, SearchFilters } from '@/types/Property';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ city?: string; query?: string }>();
  const [searchQuery, setSearchQuery] = useState(params.query || '');
  const [filters, setFilters] = useState<SearchFilters>({
    city: params.city || 'all',
    type: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, filters]);

  const filterProperties = () => {
    let filtered = mockProperties;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by city
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(property => property.location.city === filters.city);
    }

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
    }

    setFilteredProperties(filtered);
  };

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

  const renderFilterButton = (label: string, value: string, currentValue: string, onPress: () => void) => (
    <Pressable
      style={[
        styles.filterButton,
        { backgroundColor: currentValue === value ? colors.primary : colors.backgroundAlt }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterButtonText,
        { color: currentValue === value ? colors.card : colors.text }
      ]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Recherche',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600', fontFamily: 'Montserrat_600SemiBold' },
        }}
      />
      
      <View style={commonStyles.content}>
        {/* Search Bar */}
        <View style={commonStyles.section}>
          <View style={commonStyles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher par ville, quartier..."
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable
              style={styles.filterToggle}
              onPress={() => setShowFilters(!showFilters)}
            >
              <IconSymbol 
                name="slider.horizontal.3" 
                size={20} 
                color={showFilters ? colors.primary : colors.textLight} 
              />
            </Pressable>
          </View>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={[commonStyles.section, commonStyles.card]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Filtres</Text>
            
            {/* City Filter */}
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Ville</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              <View style={styles.filterRow}>
                {renderFilterButton('Toutes', 'all', filters.city || 'all', () => 
                  setFilters({ ...filters, city: 'all' })
                )}
                {cities.map(city => 
                  renderFilterButton(city, city, filters.city || 'all', () => 
                    setFilters({ ...filters, city })
                  )
                )}
              </View>
            </ScrollView>

            {/* Type Filter */}
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Type</Text>
            <View style={[styles.filterRow, { marginBottom: 16 }]}>
              {renderFilterButton('Tous', 'all', filters.type || 'all', () => 
                setFilters({ ...filters, type: 'all' })
              )}
              {renderFilterButton('Villa', 'villa', filters.type || 'all', () => 
                setFilters({ ...filters, type: 'villa' })
              )}
              {renderFilterButton('Appartement', 'apartment', filters.type || 'all', () => 
                setFilters({ ...filters, type: 'apartment' })
              )}
            </View>

            {/* Bedrooms Filter */}
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Chambres minimum</Text>
            <View style={styles.filterRow}>
              {[1, 2, 3, 4, 5].map(num => 
                renderFilterButton(`${num}+`, num.toString(), filters.bedrooms?.toString() || '', () => 
                  setFilters({ ...filters, bedrooms: num })
                )
              )}
              <Pressable
                style={styles.clearButton}
                onPress={() => setFilters({ ...filters, bedrooms: undefined })}
              >
                <Text style={styles.clearButtonText}>Effacer</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Results */}
        <View style={[commonStyles.section, { flex: 1 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            {filteredProperties.length} résultat{filteredProperties.length > 1 ? 's' : ''}
          </Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map(renderPropertyCard)
            ) : (
              <View style={styles.noResults}>
                <IconSymbol name="magnifyingglass" size={48} color={colors.textLight} />
                <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
                  Aucune propriété trouvée
                </Text>
                <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                  Essayez de modifier vos critères de recherche
                </Text>
              </View>
            )}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'OpenSans_400Regular',
  },
  filterToggle: {
    padding: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.textLight,
  },
  clearButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
});
