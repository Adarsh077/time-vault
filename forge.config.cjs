module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'Vault-Time-Locked',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'Vault-Time-Locked.png',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
