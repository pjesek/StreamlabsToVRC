# StreamlabsToVRC
Streamlabs alerts integration with VRChat through OSC

This app integrates Streamlabs with VRChat OSC, making stream more interactive and easy to trigger animations at specified alerts.
Currently supported alerts:
- Follow
- Subscription

![https://cdn.discordapp.com/attachments/923607203183738890/1149059176107102248/osctwitch.gif]


Float parameters for each alert can be configured in `config.json`.
While the alert is triggered, it changes float value from 0 to 1 for `1 second`.

Requirements:
- Node.js
- Streamlabs Account (for a Socket API Token)
