import React, { Component, PropTypes } from 'react';


export default class MessengerPlugin extends Component {
    static propTypes = {
        appId: PropTypes.string.isRequired,
        pageId: PropTypes.string.isRequired,
        passthroughParams: (props, propName, componentName) => {
            const stringError = PropTypes.string(props, propName, componentName);

            if (stringError) {
                return stringError;
            }

            if (propName in props && props[propName].length > 50) {
                return new Error(`Invalid prop ${propName}: must be smaller than 50 characters.`);
            }
        },
        type: PropTypes.oneOf(['send-to', 'message-us']),
        color: PropTypes.oneOf(['blue', 'white']),
        size: PropTypes.oneOf(['standard', 'large', 'xlarge'])
    };

    static defaultProps = {
        color: 'blue',
        size: 'standard',
        type: 'send-to'
    }

    componentDidMount() {
        const {FB, appId} = this.props;

        FB.init({
            appId,
            xfbml: true,
            version: 'v2.6'
        });
    }
    render() {
        const {type, appId, passthroughParams, color, size, pageId} = this.props;
        return <div className={type === 'send-to' ? 'fb-send-to-messenger' : 'fb-messengermessageus'}
            messenger_app_id={appId}
            page_id={pageId}
            data-ref={passthroughParams}
            color={color}
            size={size}></div>;
    }
}
