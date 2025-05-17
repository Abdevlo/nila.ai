// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Add support for importing SVG files
const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = [...assetExts.filter((ext) => ext !== "svg"), "db"];
config.resolver.sourceExts = [...sourceExts, "svg", "mjs", "cjs"];

// Fix transformer settings
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
};

// Reset resolver settings
config.resolver.disableHierarchicalLookup = false;
config.resolver.blockList = [];
config.resolver.extraNodeModules = {};

// Export the config with NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
