import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CocktailApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
