'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessengerPlugin = function (_Component) {
    (0, _inherits3.default)(MessengerPlugin, _Component);

    function MessengerPlugin() {
        (0, _classCallCheck3.default)(this, MessengerPlugin);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    MessengerPlugin.prototype.initFacebookSDK = function initFacebookSDK() {
        var _props = this.props,
            FB = _props.FB,
            appId = _props.appId;


        if (FB) {
            FB.init({
                appId: appId,
                xfbml: true,
                version: 'v2.6'
            });
        }
    };

    MessengerPlugin.prototype.componentDidMount = function componentDidMount() {
        this.initFacebookSDK();
    };

    MessengerPlugin.prototype.componentDidUpdate = function componentDidUpdate() {
        this.initFacebookSDK();
    };

    MessengerPlugin.prototype.render = function render() {
        var _props2 = this.props,
            type = _props2.type,
            appId = _props2.appId,
            passthroughParams = _props2.passthroughParams,
            color = _props2.color,
            size = _props2.size,
            pageId = _props2.pageId;
        // use dangerouslySetInnerHTML because React will ignore custom attributes

        var markup = {
            __html: '<div class=' + (type === 'send-to' ? 'fb-send-to-messenger' : 'fb-messengermessageus') + ' messenger_app_id=' + appId + ' page_id=' + pageId + ' data-ref=' + passthroughParams + ' color=' + color + ' size=' + size + '></div>'
        };
        return _react2.default.createElement('div', { dangerouslySetInnerHTML: markup });
    };

    return MessengerPlugin;
}(_react.Component);

MessengerPlugin.propTypes = {
    appId: _propTypes2.default.string.isRequired,
    pageId: _propTypes2.default.string.isRequired,
    FB: _propTypes2.default.object,
    passthroughParams: function passthroughParams(props, propName) {
        if (propName in props) {
            var value = props[propName];

            if (typeof value !== 'string') {
                return new Error('Invalid prop ' + propName + ': must be a string.');
            }

            if (props[propName].length > 250) {
                return new Error('Invalid prop ' + propName + ': must be smaller than 250 characters.');
            }
        }
    },
    type: _propTypes2.default.oneOf(['send-to', 'message-us']),
    color: _propTypes2.default.oneOf(['blue', 'white']),
    size: _propTypes2.default.oneOf(['standard', 'large', 'xlarge'])
};
MessengerPlugin.defaultProps = {
    color: 'blue',
    size: 'standard',
    type: 'send-to'
};
exports.default = MessengerPlugin;