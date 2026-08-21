const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  resolver: {
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
  },
});
