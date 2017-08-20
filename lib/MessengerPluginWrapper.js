'use strict';

exports.__esModule = true;

var _reactAsyncScript = require('react-async-script');

var _reactAsyncScript2 = _interopRequireDefault(_reactAsyncScript);

var _MessengerPlugin = require('./MessengerPlugin');

var _MessengerPlugin2 = _interopRequireDefault(_MessengerPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = '//connect.facebook.net/en_US/sdk.js';

exports.default = (0, _reactAsyncScript2.default)(_MessengerPlugin2.default, URL, {
    globalName: 'FB'
});