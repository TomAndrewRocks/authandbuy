module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.ios.tsx',
            '.android.tsx',
            '.js',
            '.ts',
            '.tsx',
            '.json',
          ],
          alias: {
            '@components': './app/shared/components',
            '@themes': './app/shared/themes',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'AUTHBUY_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
