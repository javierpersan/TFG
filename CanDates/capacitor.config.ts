import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.getcapacitor.myapp',
  appName: 'MyApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
