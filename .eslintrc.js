module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "block-spacing": "error",
        "brace-style": "error",
        "comma-dangle": "error",
        "comma-spacing": "error",
        "curly": "error",
        "eqeqeq": "error",
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "no-inner-declarations": ["error", "both"],
        "no-invalid-this": "error",
        "no-multi-spaces": "error",
        "no-plusplus": "error",
        "no-self-assign": "off",
        "no-trailing-spaces": "error",
        "no-unused-vars": ["error", {"args": "after-used"}],
        "no-undef": "error",
        "no-use-before-define": ["error", { "functions": false }],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-before-function-paren": "error",
        "strict": ["error", "global"]
    }
}; 