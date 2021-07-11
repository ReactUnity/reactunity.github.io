module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.output = config.output || {};
    config.output.devtoolModuleFilenameTemplate = function (info) {
      return "file:///" + encodeURI(info.absoluteResourcePath);
    }
    return config;
  },
}
