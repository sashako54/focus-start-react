module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
        'declaration-empty-line-before': [
            'always',
            {
                except: ['first-nested', 'after-comment'],
                ignore: ['after-declaration']
            }
        ]
    }
};
