var register = require('babel-core/register');
var app_path = '../src/index.js';

register({
    presets: ['stage-3']
});

require(app_path);