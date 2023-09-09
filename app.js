const { io } = require('socket.io-client');
const osc = require('./osc');

const config = require('./config.json');
const socket = io(`https://sockets.streamlabs.com?token=${config.streamlabs_socket_token}`);

const address = "localhost";
const port = 9000;

socket.on("connect", () => {
    console.log("Connected to Streamlabs, Listening for alerts ^^");
});
  
socket.on("disconnect", () => {
    console.log("Connection with Streamlabs disconnected.");
});

socket.on("event", (eventData) => {
    if(eventData.for === "twitch_account") {
        switch(eventData.type) {
            case 'follow':
                console.log("New follower!");
                osc.sendFloat({
                    path: config.follower_osc_parameter,
                    data: 1
                    });
                delayInterval = setTimeout(function() {
                    osc.sendFloat({
                        path: config.follower_osc_parameter,
                        data: 0
                        });
                }, 1000);
                break;
            case 'subscription' || 'resub':
                console.log("New subscriber!")
                osc.sendFloat({
                    path: config.subscriber_osc_parameter,
                    data: 1
                    });
                delayInterval = setTimeout(function() {
                    osc.sendFloat({
                        path: config.subscriber_osc_parameter,
                        data: 0
                        });
                }, 1000);
                break;
            case 'bits':
                console.log("Bits sent!")
                osc.sendFloat({
                    path: config.bits_osc_parameter,
                    data: 1
                    });
                delayInterval = setTimeout(function() {
                    osc.sendFloat({
                        path: config.bits_osc_parameter,
                        data: 0
                        });
                }, 1000);
                break;
        }
    }
})

osc.init({
    address,
    port,
    onReady: () => {
      console.log(`OSC Client listening to "${address}:${port}"`);
    },
    onError: (err) => {
      console.log(`The OSC driver experienced an error! ${err}`);
      process.exit();
    }
  });

