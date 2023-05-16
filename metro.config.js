// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const cfg = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
})

cfg.resolver.unstable_enablePackageExports = true

cfg.resolver.sourceExts = process.env.RN_SRC_EXT
  ? process.env.RN_SRC_EXT.split(',').concat(cfg.resolver.sourceExts)
  : cfg.resolver.sourceExts

cfg.resolver.sourceExts.push('mjs')

module.exports = cfg
