module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: ['react-native-reanimated/plugin'],
    presets: ['babel-preset-expo'],
  };
};
