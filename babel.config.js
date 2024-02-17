module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.tsx",
            ".android.tsx",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".mp4"
          ],
          alias: {
            "@api": "./app/shared/api",
            "@components": "./app/shared/components",
            "@contexts": "./app/shared/contexts",
            "@themes": "./app/shared/themes",
            "@hooks": "./app/shared/hooks",
            "@screens": "./app/modules/screens",
            "@interfaces": "./app/shared/interfaces",
            "@provider": "./app/shared/provider",
            "@routes": "./app/shared/routes",
            "@utils": "./app/shared/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
