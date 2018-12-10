const MOD_SEPARATOR = '_';

const toKebabCase = string =>
    String(string)
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase();

const getMods = (...args) => {
    const mods = [];

    args.forEach(arg => {
        if (typeof arg === 'string' || typeof arg === 'number') {
            mods.push(toKebabCase(key));
        } else if (Array.isArray(arg)) {
            mods.concat(getMods(...item));
        } else if (typeof arg === 'object') {
            Object.keys(arg).forEach(key => {
                if (arg[key]) {
                    mods.push(key);
                }
            });
        }
    });

    return mods;
};

export default (name, ...args) =>
    [name]
        .concat(getMods(...args).map(mod => `${name}${MOD_SEPARATOR}${mod}`))
        .join(' ');
