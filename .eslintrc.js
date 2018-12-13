module.exports = {
    env: {
        browser: true
    },
    extends: 'airbnb',
    parser: 'babel-eslint',
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'arrow-parens': ['error', 'as-needed'],
        'react/jsx-indent': ['error', 4],
        'no-unused-vars': ['error', { args: 'none' }],
        'react/destructuring-assignment': ['error', 'as-needed'],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-indent-props': ['error', 4],
        'implicit-arrow-linebreak': ['error', 'beside']
    }
};
