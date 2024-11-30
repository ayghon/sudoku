const { withAndroidManifest } = require('@expo/config-plugins');

const blockedPermissions = [
  'android.permission.INTERNET',
  'android.permission.READ_EXTERNAL_STORAGE',
  'android.permission.RECORD_AUDIO',
  'android.permission.SYSTEM_ALERT_WINDOW',
  'android.permission.VIBRATE',
  'android.permission.WRITE_EXTERNAL_STORAGE',
];

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    androidManifest['uses-permission'] = androidManifest['uses-permission'].filter(
      (perm) => !blockedPermissions.includes(perm.$['android:name']),
    );

    return config;
  });
};
