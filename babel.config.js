module.exports = function (api) {
    
    api.cache(true);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-typescript'
    ];

    const plugins = [
        '@babel/proposal-object-rest-spread',
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/proposal-class-properties', { 'loose': true }],
    ];

    return {
        presets,
        plugins
    };
};