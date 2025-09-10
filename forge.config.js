import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import { VitePlugin } from '@electron-forge/plugin-vite'

const config = {
  packagerConfig: {
    asar: true,
    prune: true,
    icon: './assets/icons/icon',
  },
  rebuildConfig: {},
  makers: [
    { name: '@electron-forge/maker-dmg', platforms:[ 'darwin' ], config: { format:'ULFO' } },
  ],
  plugins: [
    { name: '@electron-forge/plugin-auto-unpack-natives', config: {} },
    new VitePlugin( {
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/ui/index.ts',
          config: 'vite.api.config.ts',
        },
      ],
      renderer: [ { config:'vite.ui.config.ts' } ],
    } ),
    new FusesPlugin( {
      version: FuseVersion.V1,
      [ FuseV1Options.RunAsNode ]: false,
      [ FuseV1Options.EnableCookieEncryption ]: true,
      [ FuseV1Options.EnableNodeOptionsEnvironmentVariable ]: false,
      [ FuseV1Options.EnableNodeCliInspectArguments ]: false,
      [ FuseV1Options.EnableEmbeddedAsarIntegrityValidation ]: true,
      [ FuseV1Options.OnlyLoadAppFromAsar ]: true,
    } ),
  ],
}

export default config
