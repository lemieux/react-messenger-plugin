# react-messenger-plugin

Component wrapper for [Facebook Messenger plugins](https://developers.facebook.com/docs/messenger-platform/plugin-reference)

## Installation

```shell
npm install --save react-messenger-plugin
```

## Usage

To use the Messenger Plugin, you will need an App Id and a Page Id. You can find create an app [here](https://developers.facebook.com/apps/) and you will find your page Id at the bottom of your Facebook page settings.

You can then use the plugin.

```jsx
var React = require("react");
var render = require("react-dom").render;
var MessengerPlugin = require("react-messenger-plugin");

render(
    <MessengerPlugin
      appId="<YOUR-APP-ID>"
      pageId="<YOUR-PAGE-ID>"
    />,
    document.body
);
```

### Notes
Expect a delay before the button appears. This is mainly caused by the time required by the Facebook SDK to load and then the time for it to initialize. To reduce the delay, see the advance usage described below.

### Props
| Name | Type | Required? | Default | Description |
| --- | --- | ---- | --- | --- | --- |
| appId | string | yes | - | Your Facebook app id |
| pageId | string | yes | - | Your Facebook page id |
| passthroughParams | string | no | - | Equivalent of `data-ref`. Used to pass state with the authentication. See [documentation](https://developers.facebook.com/docs/messenger-platform/webhook-reference#auth). |
| type | string | no | `send-to` | Type of plugin. Must be either `send-to` (Send-to-Messenger plugin) or `message-us` (Message-Us plugin). |
| color | string | no | `blue` | Color of the button. Must be either `blue` or `white`. |
| size | string | no | `standard` | Size of the button. Must be either `standard`, `large`, or `xlarge`. |
| asyncScriptOnLoad | function | no | - | Callback triggered when the SDK script is loaded. |

## Advanced usage

If you already have the Facebook SDK loaded in your page, you can use the unwrapped component and pass the SDK to it.

```jsx
var React = require("react");
var render = require("react-dom").render;
var MessengerPlugin = require("react-messenger-plugin/lib/MessengerPlugin");

render(
    <MessengerPlugin
      appId="<YOUR-APP-ID>"
      pageId="<YOUR-PAGE-ID>",
      FB={window.FB}
    />,
    document.body
);
```
---

*Inspired by [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha)*
