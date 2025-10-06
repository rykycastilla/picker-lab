import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import { VitePlugin } from '@electron-forge/plugin-vite'

const includeList = [ 'node_modules', 'bin', 'database', '.vite', 'package.json' ]

const config = {
  packagerConfig: {
    prune: true,
    icon: './assets/icons/icon',
    /**
     * @param { string } path
     */
    ignore( path ) {
      if( path === '' ) { return false }
      for( const include of includeList ) {
        if( path.startsWith( `/${ include }` ) ) { return false }
      }
      return true
    },
  },
  rebuildConfig: {},
  makers: [
    { name: '@electron-forge/maker-dmg', platforms:[ 'darwin' ], config: { format:'ULFO' } },
  ],
  plugins: [
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
    } ),
  ],
}

export default config
