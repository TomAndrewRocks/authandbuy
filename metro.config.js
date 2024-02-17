/* eslint-disable no-undef */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
  });

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: [
      ...resolver.assetExts.filter((ext) => ext !== "svg"),
      "glb",
      "gltf",
      "mtl",
      "obj",
      "png",
      "jpg",
      "ttf",
      "mp4",
    ],
    sourceExts: [
      ...resolver.sourceExts,
      "svg",
      "mjs",
      "js",
      "jsx",
      "json",
      "ts",
      "tsx",
      "cjs",
      "mp4",
    ],
  };

  return config;
})();
