import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import tailwind, { tailwindGlobal, tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindConfig from './tailwind.config';


export const config: Config = {
  namespace: 'stencil-library',
  plugins: [
    tailwindGlobal(),
    tailwind({tailwindConf: tailwindConfig}),
    tailwindHMR(),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: 'stencil-library',
      proxiesFile: '../react-library/lib/components/stencil-generated/index.ts',
    }),
  ],
};
