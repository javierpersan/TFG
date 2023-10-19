import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'MiApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      providers: ['google.com', 'twitter.com', 'facebook.com', 'phone'],
      languageCode: 'en',
      nativeAuth: false,
      webAuthFlow: 'popup',
      forceAuthPicker: false,
      phoneVerificationPrompt: 'auto',
      signInOptions: {
        google: {
          scopes: ['profile', 'email']
        },
        twitter: {},
        facebook: {
          scopes: ['email', 'user_birthday']
        },
        phone: {
          defaultCountry: 'US'
        }
      }
    }
  }
};

export default config;
