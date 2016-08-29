import React, { Component, PropTypes } from 'react';


export default class MessengerPlugin extends Component {
    static propTypes = {
        appId: PropTypes.string.isRequired,
        pageId: PropTypes.string.isRequired,
        FB: PropTypes.object,
        passthroughParams: (props, propName) => {
            if (propName in props) {
                const value = props[propName];

                if (typeof value !== 'string') {
                    return new Error(`Invalid prop ${propName}: must be a string.`);
                }

                if (props[propName].length > 50) {
                    return new Error(`Invalid prop ${propName}: must be smaller than 50 characters.`);
                }
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

    initFacebookSDK() {
        const {FB, appId} = this.props;

        if (FB) {
            FB.init({
                appId,
                xfbml: true,
                version: 'v2.6'
            });
        }
    }

    componentDidMount() {
        this.initFacebookSDK();
    }

    componentDidUpdate() {
        this.initFacebookSDK();
    }

    render() {
        const {type, appId, passthroughParams, color, size, pageId} = this.props;
        // use dangerouslySetInnerHTML because React will ignore custom attributes
        const markup = {
            __html: `<div class=${type === 'send-to' ? 'fb-send-to-messenger' : 'fb-messengermessageus'} messenger_app_id=${appId} page_id=${pageId} data-ref=${passthroughParams} color=${color} size=${size}></div>`
        };
        return <div dangerouslySetInnerHTML={markup}></div>;
    }
}
