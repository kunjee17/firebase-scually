import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'FirebaseScully',
  outDir: './dist/static',
  routes: {
    '/faq': {
      type: 'default',
      manualIdleCheck: true
   },
  },
};
