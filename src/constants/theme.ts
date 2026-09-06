/**
 * ShykAuto Centralized Color Palette & Design Constants
 * All project colors are defined here in one single place.
 * Changing a value here modifies the visual identity globally.
 */
export const COLORS = {
  // Brand & Accent Colors (Silver Metallic Identity)
  primary: '#cbd5e1',          // Sleek Metallic Silver
  primaryDark: '#94a3b8',      // Deep Silver / Titanium
  primaryGlow: 'rgba(203, 213, 225, 0.15)',
  primaryBorder: 'rgba(203, 213, 225, 0.25)',

  // Dark Theme Surfaces
  bgDark: '#070b14',           // Midnight Blueprint Dark (Main Page Canvas)
  bgHeader: '#070b14f0',       // Glass Header
  bgCard: '#0d1527',           // Deep Navy Blueprint Card
  bgCardHover: '#111c34',      // Card Hover State
  bgElevated: '#16233f',       // Elevated Container
  bgInput: '#090f1d',          // Input Field Background

  // Light Theme Surfaces (Mixed Theme Sections)
  bgLight: '#f4f5f7',          // Clean Off-White Section Canvas
  bgCardLight: '#ffffff',      // Pure White Card
  bgCardLightHover: '#fafbfc', // Light Card Hover
  borderLightSection: '#e2e8f0', // Crisp Light Border
  textDarkHeading: '#0f172a',  // Rich Dark Slate Heading
  textDarkBody: '#43474e',     // Readable Body Slate
  accentBlueLight: '#007aff',  // High-contrast Blue Accent for Light sections

  // Typography Colors
  textPrimary: '#f8fafc',      // Crisp Ice White (Headings & Bold Text)
  textSecondary: '#94a3b8',    // Slate Body Text
  textMuted: '#64748b',        // Muted Labels & Captions
  textSilver: '#cbd5e1',       // Silver Highlight Text

  // Functional & Status Accents
  accentAmber: '#f59e0b',      // Warning / Standby Power Amber
  accentCold: '#38bdf8',       // Cold Frost Blue
  accentEmerald: '#10b981',    // Success / In Stock Green
  accentRed: '#ef4444',        // Urgent / Danger / Out of Stock

  // Borders & Structural Grid
  borderSubtle: '#1e293b',     // Structural Dark Border
  borderLight: '#334155',      // Active Slate Border
  borderSilver: 'rgba(203, 213, 225, 0.25)', // Silver Blueprint Grid Accent
} as const;

export type ThemeColors = typeof COLORS;
