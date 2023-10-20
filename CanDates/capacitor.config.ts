import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.auth.canidates',
  appName: 'canidates',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '864453769156-eto8bm9nu6ec0an5g4bkkpt8cfquqgl2.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
