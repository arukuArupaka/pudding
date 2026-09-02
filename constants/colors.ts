export const colors = {
  background: '#F8F4EA',
  surface: '#FFFDF5',
  surfaceMuted: '#F1EBDD',
  text: '#2F2A22',
  mutedText: '#8A8068',
  subtleText: '#A79C82',
  border: '#E6DDC8',
  primary: '#6A4E2F',
  primarySoft: '#FFF3B8',
  primaryText: '#FFFFFF',
  action: '#FFE97A',
  actionText: '#6A4E2F',
  accent: '#9A6B45',
  success: '#8A7A32',
  successSoft: '#F5EFCF',
  warning: '#B14444',
  warningSoft: '#FFD9D6',
  danger: '#B14444',
  dangerSoft: '#FFD9D6',
  tabActive: '#6A4E2F',
  tabActiveSoft: '#FFE97A',
  tabInactive: '#535353',
  glassSurface: 'rgba(255, 255, 255, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.4)',
};

export const radii = {
  card: 8,
  control: 8,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const typography = {
  screenTitle: 28,
  sectionTitle: 18,
  cardTitle: 17,
  body: 15,
  caption: 13,
  small: 12,
};

export const controls = {
  minTap: 44,
  inputHeight: 52,
  primaryButtonHeight: 52,
};

export const shadows = {
  card: {
    shadowColor: '#6A4E2F',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 4,
  },
  button: {
    shadowColor: '#C4A02F',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    elevation: 5,
  },
  pressed: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    transform: [
      {
        translateY: 2,
      },
    ],
    elevation: 1,
  },
  navigation: {
    shadowColor: '#2F2A22',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 8,
  },
};
