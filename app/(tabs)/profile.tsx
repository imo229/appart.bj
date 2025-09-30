
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const menuItems = [
    {
      icon: 'person.circle',
      title: 'Informations personnelles',
      subtitle: 'Gérez vos informations de profil',
      onPress: () => console.log('Profile info pressed'),
    },
    {
      icon: 'house.circle',
      title: 'Mes réservations',
      subtitle: 'Consultez vos réservations passées et à venir',
      onPress: () => console.log('Bookings pressed'),
    },
    {
      icon: 'creditcard.circle',
      title: 'Moyens de paiement',
      subtitle: 'Gérez vos cartes et méthodes de paiement',
      onPress: () => console.log('Payment methods pressed'),
    },
    {
      icon: 'bell.circle',
      title: 'Notifications',
      subtitle: 'Configurez vos préférences de notification',
      onPress: () => console.log('Notifications pressed'),
    },
    {
      icon: 'questionmark.circle',
      title: 'Aide et support',
      subtitle: 'Obtenez de l\'aide ou contactez le support',
      onPress: () => console.log('Help pressed'),
    },
    {
      icon: 'gear.circle',
      title: 'Paramètres',
      subtitle: 'Configurez l\'application selon vos préférences',
      onPress: () => console.log('Settings pressed'),
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <Pressable key={index} style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <IconSymbol name={item.icon as any} size={24} color={colors.primary} />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={16} color={colors.textLight} />
    </Pressable>
  );

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Profil',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600', fontFamily: 'Montserrat_600SemiBold' },
        }}
      />
      
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={commonStyles.section}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@email.com</Text>
              <Text style={styles.profilePhone}>+229 97 12 34 56</Text>
            </View>
            <Pressable style={styles.editButton}>
              <IconSymbol name="pencil" size={16} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={commonStyles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Réservations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Favoris</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Note moyenne</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Compte</Text>
          <View style={commonStyles.card}>
            {menuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <View style={commonStyles.section}>
          <Pressable style={styles.logoutButton}>
            <IconSymbol name="arrow.right.square" size={20} color={colors.primary} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>

        {/* App Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.textLight, { textAlign: 'center' }]}>
            Location Bénin v1.0.0
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 4 }]}>
            Trouvez votre logement idéal au Bénin
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: colors.card,
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    color: colors.textLight,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    color: colors.textLight,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Montserrat_700Bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular',
    color: colors.textLight,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
    color: colors.text,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular',
    color: colors.textLight,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  logoutText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    marginLeft: 8,
  },
});
