
import { Property } from '../types/Property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderne à Cotonou',
    description: 'Magnifique villa moderne avec piscine privée, située dans un quartier résidentiel calme de Cotonou. Parfaite pour les familles ou les groupes d\'amis.',
    price: 85000,
    currency: 'FCFA',
    location: {
      city: 'Cotonou',
      district: 'Cocotomey',
      address: 'Rue des Palmiers, Cocotomey'
    },
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    ],
    amenities: ['Piscine', 'Climatisation', 'WiFi', 'Parking', 'Jardin', 'Sécurité 24h'],
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
    owner: {
      name: 'Adjovi Mensah',
      phone: '+229 97 12 34 56',
      email: 'adjovi.mensah@email.com'
    }
  },
  {
    id: '2',
    title: 'Appartement Standing Porto-Novo',
    description: 'Appartement meublé de standing dans le centre de Porto-Novo, proche des commodités et des sites touristiques.',
    price: 45000,
    currency: 'FCFA',
    location: {
      city: 'Porto-Novo',
      district: 'Centre-ville',
      address: 'Avenue Jean Bayol'
    },
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    amenities: ['Climatisation', 'WiFi', 'Balcon', 'Ascenseur', 'Parking'],
    isAvailable: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 18,
    owner: {
      name: 'Kossou Bertin',
      phone: '+229 96 78 90 12',
      email: 'kossou.bertin@email.com'
    }
  },
  {
    id: '3',
    title: 'Villa avec Vue sur Mer - Ouidah',
    description: 'Superbe villa face à l\'océan à Ouidah, idéale pour des vacances inoubliables. Vue panoramique sur la mer.',
    price: 120000,
    currency: 'FCFA',
    location: {
      city: 'Ouidah',
      district: 'Plage',
      address: 'Route de la Plage'
    },
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    ],
    amenities: ['Vue mer', 'Piscine', 'Climatisation', 'WiFi', 'Parking', 'Jardin', 'Terrasse'],
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 31,
    owner: {
      name: 'Fatima Alassane',
      phone: '+229 95 44 33 22',
      email: 'fatima.alassane@email.com'
    }
  },
  {
    id: '4',
    title: 'Appartement Cosy Parakou',
    description: 'Charmant appartement meublé au cœur de Parakou, parfait pour les voyageurs d\'affaires ou les touristes.',
    price: 35000,
    currency: 'FCFA',
    location: {
      city: 'Parakou',
      district: 'Centre',
      address: 'Quartier Banikanni'
    },
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 80,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop'
    ],
    amenities: ['Climatisation', 'WiFi', 'Cuisine équipée', 'Parking'],
    isAvailable: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 12,
    owner: {
      name: 'Ibrahim Sanni',
      phone: '+229 94 55 66 77',
      email: 'ibrahim.sanni@email.com'
    }
  },
  {
    id: '5',
    title: 'Villa Familiale Abomey-Calavi',
    description: 'Grande villa familiale dans un quartier résidentiel calme d\'Abomey-Calavi, proche de l\'université.',
    price: 65000,
    currency: 'FCFA',
    location: {
      city: 'Abomey-Calavi',
      district: 'Godomey',
      address: 'Carrefour Godomey'
    },
    type: 'villa',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    amenities: ['Jardin', 'Climatisation', 'WiFi', 'Parking', 'Sécurité'],
    isAvailable: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 16,
    owner: {
      name: 'Marie Agbodjan',
      phone: '+229 93 22 11 88',
      email: 'marie.agbodjan@email.com'
    }
  }
];

export const featuredProperties = mockProperties.filter(property => property.isFeatured);

export const cities = ['Cotonou', 'Porto-Novo', 'Ouidah', 'Parakou', 'Abomey-Calavi', 'Bohicon', 'Natitingou'];

export const amenitiesList = [
  'Piscine', 'Climatisation', 'WiFi', 'Parking', 'Jardin', 'Sécurité 24h',
  'Vue mer', 'Terrasse', 'Balcon', 'Ascenseur', 'Cuisine équipée', 'Sécurité'
];
