module.exports = function (api) {
  const platform = api.caller(getPlatform)
  api.cache(true)

  const platformAliases =
    platform === 'web'
      ? {
          'react-native-linear-gradient': 'react-native-web-linear-gradient',
          'react-native-webview': 'react-native-web-webview',
        }
      : {}

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            ...platformAliases,
            // This needs to be mirrored in tsconfig.json
            lib: './src/lib',
            platform: './src/platform',
            state: './src/state',
            view: './src/view',
            '@/': './src',
          },
        },
      ],
      'react-native-reanimated/plugin', // NOTE: this plugin MUST be last
      require.resolve('expo-router/babel'),
    ],
  }
}

function getPlatform(caller) {
  return caller && caller.platform
}
