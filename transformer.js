const semver = require("semver");
const scripts = require("vue-native-scripts");
const version = semver(require("react-native/package.json").version).minor;

let transformer;

if (version >= 59) {
    transformer = require("metro-react-native-babel-transformer");
} else if (version >= 56) {
    transformer = require("metro/src/reactNativeTransformer");
} else if (version >= 52) {
    transformer = require("metro/src/transformer");
} else if (version >= 47) {
    transformer = require("metro-bundler/src/transformer");
} else if (version === 46) {
    transformer = require("metro-bundler/build/transformer");
} else {
    transformer = { transform({ src, filename, options }) { return require("react-native/packager/transformer").transform(src, filename, options); } };
}

const extensions = ["vue"];

module.exports.transform = function ({ src, filename, options }) {
    if (extensions.some(ext => filename.endsWith(`.${ext}`))) return scripts.transform({ src, filename, options });

    return transformer.transform({ src, filename, options });
};
