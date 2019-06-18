import makeAsyncScriptLoader from 'react-async-script';

import MessengerPlugin from './MessengerPlugin';

const URL = '//connect.facebook.net/en_US/sdk/xfbml.customerchat.js';

export default makeAsyncScriptLoader(MessengerPlugin, URL, {
    globalName: 'FB'
});
