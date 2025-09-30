import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#E67E22',    // Warm Orange (inspired by Benin's sunset)
  secondary: '#D35400',  // Darker Orange
  accent: '#F39C12',     // Golden Yellow
  background: '#FDFEFE', // Clean White
  backgroundAlt: '#F8F9FA', // Light Grey
  text: '#2C3E50',       // Dark Blue-Grey
  textLight: '#7F8C8D',  // Light Grey for secondary text
  grey: '#BDC3C7',       // Light Grey
  card: '#FFFFFF',       // Pure White for cards
  success: '#27AE60',    // Green for success states
  border: '#ECF0F1',     // Very light grey for borders
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Montserrat_700Bold',
    color: colors.text,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    color: colors.text,
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'OpenSans_400Regular',
    color: colors.text,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans_400Regular',
    color: colors.textLight,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  searchContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
