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
            '@api': './app/shared/api',
            '@components': './app/shared/components',
            '@contexts': './app/shared/contexts',
            '@themes': './app/shared/themes',
            '@screens': './app/shared/screens',
            '@interfaces': './app/shared/interfaces',
            '@routes': './app/shared/routes',
            '@utils': './app/shared/utils',
            '@web': './app/modules/web',
            '@mobile': './app/modules/mobile',
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
