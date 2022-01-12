const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

let config = Encore.getWebpackConfig();
config.watchOptions = { poll: true, ignored: /node_modules/ };
config.plugins.push(
    new BrowserSyncPlugin(
        {
            host: 'aro.tech',
            proxy: 'aro.tech',
            files: [ // watch on changes
                {
                    match: ['public/build/**/*.js'],
                    fn: function (event, file) {
                        if (event === 'change') {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
        },
        {
            reload: false, // this allow webpack server to take care of instead browser sync
            name: 'bs-webpack-plugin',
        },
    )
);
module.exports = config;