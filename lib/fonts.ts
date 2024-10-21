import {
  Manrope as FontMono,
  Inter as FontSans,
  Poppins,
} from 'next/font/google';

export const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-display',
});
