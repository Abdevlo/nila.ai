module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      // Add Reanimated plugin
      "react-native-reanimated/plugin",
    ],
  };
};
