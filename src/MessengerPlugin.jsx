import React, { Component } from 'react';
import PropTypes from 'prop-types';


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

                if (props[propName].length > 250) {
                    return new Error(`Invalid prop ${propName}: must be smaller than 250 characters.`);
                }
            }
        },
        type: PropTypes.oneOf(['send-to', 'message-us']),
        color: PropTypes.oneOf(['blue', 'white']),
        size: PropTypes.oneOf(['standard', 'large', 'xlarge']),
        onRender: PropTypes.func,
        onClick: PropTypes.func,
        onNotYou: PropTypes.func,
    };

    static defaultProps = {
        color: 'blue',
        size: 'standard',
        type: 'send-to'
    }

    initFacebookSDK() {
        const {FB, appId, onRender, onClick, onNotYou} = this.props;

        if (FB) {
            FB.init({
                appId,
                xfbml: true,
                version: 'v2.6'
            });

            FB.Event.subscribe('send_to_messenger', function(e) {
              if(onRender && e.event === "rendered") {
                onRender(e);
              }else if(onClick && e.event === "clicked") {
                onClick(e);
              }else if(onNotYou && e.event === "not_you") {
                onNotYou(e);
              }
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
