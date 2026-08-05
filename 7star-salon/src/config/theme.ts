export const fonts = {
  title: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "Inter, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif",
} as const;

export const colors = {
  primary: "#234E70",
  primaryDark: "#1a3a55",
  accent: "#C6A15B",
  background: "#FAF7F0",
  backgroundBlue: "#EEF5FA",
  card: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#E5E7EB",
} as const;

const theme = { fonts, colors } as const;

export default theme;
