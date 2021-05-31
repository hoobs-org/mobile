module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
    },
    env: {
        browser: true,
    },
    extends: ["plugin:vue/essential", "airbnb-base"],
    plugins: ["vue"],
    settings: {
        "import/resolver": {
            webpack: {
                config: "build/webpack.base.conf.js",
            },
        },
    },
    rules: {
        quotes: [
            "error",
            "double",
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "max-len": ["error", {
            code: 250,
        }],
        "vue/script-indent": [
            "error",
            4,
            {
                baseIndent: 1,
                switchCase: 1,
            },
        ],
        "import/extensions": ["error", "always", {
            js: "never",
            vue: "never",
        }],
        "no-param-reassign": ["error", {
            props: true,
            ignorePropertyModificationsFor: ["state", "acc", "e"],
        }],
        "import/no-extraneous-dependencies": ["error", {
            optionalDependencies: ["test/unit/index.js"],
        }],
        "no-new": "off",
        "spaced-comment": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    overrides: [
        {
            files: [
                "*.vue",
            ],
            rules: {
                indent: "off",
                "quote-props": "off",
            },
        }
    ],
};
