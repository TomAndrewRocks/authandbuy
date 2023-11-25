module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module:react-native-dotenv",
        {
          envName: "AUTHBUY_ENV",
          moduleName: "@env",
          path: ".env",
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
