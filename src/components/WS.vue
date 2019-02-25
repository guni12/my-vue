<template>
<main>
    <Nav />
    <h2>Broadcast with subprotocol json</h2>
    <div id="who" class="who">{{ who }}</div>
    <div class="ws">
        <form id="form1">
            <!-- log -->
            <div class="field">
                <label class="log">Log:</label><br />
                    <p><span class ="output">{{ output }}</span></p>
            </div>

            <!-- connect -->
            <div class="field connect">
                <label class="label connect">Connect:</label><br />
                <input id="address" type="text" name="address" placeholder="default ws://my-ws.guni.me/" v-model="address">
                <input id="nick" type="text" value="" placeholder="nickname" name="nick" v-model="nick" >
            </div>

            <!-- submit button -->
            <div class="field">
                <button type="submit" class="button" @click.self.prevent="getConnect">Connect</button>
            </div>
        </form>


        <form id="form2">
            <!-- message -->
            <div class="field message">
                    <label class="label message">Send message:<br />Free text, or<br />/nick new-nick<br />/all<br />/private friends_nick Your private message</label><br />
                    <input id="message" type="text" placeholder="message" name="message" v-model="message">
            </div>


            <!-- submit button -->
            <div class="field">
                <button type="submit" class="button" name="send_message" @click.self.prevent="getSend">Send</button>
            </div>
        </form>

        <form id="form3">
            <div class="field">
                <button type="submit" id="close" class="button" name="close" @click.self.prevent="getClose">Close</button>
            </div>
        </form>
    </div>
</main>
</template>



<script>
import Nav from './Nav.vue'
let websocket;

export default {
    name: 'WS',
    props: { },
    components: {
        Nav
    },
    data() {
        return {
            nick: "",
            output: "",
            who: "",
            nic: "",
            address: "",
            savedoutput: "",
            savedme: ""
        }
    },
    mounted() {
        this.getConnect();
    },
    methods: {
        getConnect(/*event*/) {
            // console.log(event);
/*
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }*/
            let that = this;
            //let haveaddress = that.address ? that.address : "ws://localhost:1347/";
            let haveaddress = that.address ? that.address : "wss://my-ws.guni.me/";
            var url = haveaddress + that.nick;
            websocket = new WebSocket(url, "json");
            let nic = that.nick ? that.nick : "Anonymous";
            that.nic = nic;
            that.who = "Nickname " + nic + "'s page";

            websocket.onopen = function() {
                let content = "The websocket is now open using '" + websocket.protocol + "'.";
                let msg = {
                    "message": content,
                    "nickname": that.nic
                }
                let asjson = JSON.stringify(msg);
                that.outputLog(asjson);
            };

            websocket.onmessage = function(event) {
                that.outputLog(event.data);
            };

            websocket.onclose = function() {
                let content = "The websocket is now closed";
                let msg = {
                    "message": content,
                    "nickname": that.nic
                }
                let asjson = JSON.stringify(msg);
                that.outputLog(asjson);
            };
        },

        outputLog(message) {
            let that = this;
            that.output = "";
            let now = new Date();
            let timestamp = now.toLocaleTimeString();
            that.info = JSON.parse(message);

            let printnic = "Anonymous: ";
            if (that.info.nickname) {
                printnic = that.info.nickname + ": ";
            } else if (that.nic) {
                printnic = that.nic + ": ";
            }

            that.output = that.savedoutput;
            that.output += `\n${timestamp}\n`;
            that.output += `${printnic}${that.info.message}`;
            that.savedoutput = that.output;
        },

        getSend(event) {
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }
            let that = this;
            let messageText = that.message;

            if (messageText.indexOf('/nick') == 0) {
                let nickname_array = messageText.split(' ')
                if (nickname_array.length >= 2) {
                    let newname = nickname_array[1];
                    that.nic = newname;
                    that.who = "Nickname " + newname + "'s page";
                }
            }

            if (!websocket || websocket.readyState === 3) {
                // eslint-disable-next-line
                console.log("The websocket is not connected to a server.");
            } else {
                websocket.send(messageText);
                let msg = {
                    "message": messageText
                }
                let asjson = JSON.stringify(msg);
                that.outputLog(asjson);
            }
        },

        getClose(event) {
            //console.log(event);
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }
            let that = this;
            websocket.send("Client closing connection by intention.");
            websocket.close();
            let content = "Prepare to close websocket.";
            let msg = {
                "message": content
            }
            let asjson = JSON.stringify(msg);
            that.outputLog(asjson);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    font-size: 2em;
    margin-top: 1em;
    margin-bottom: 0.5em;
}

input {
    width: 100%;
    height: 3em;
    font-size: 1.2em;
    padding-left: 1em;
}
p {
    font-size: 1em;
}

.output {
    margin-top: 0.5em;
    margin-bottom: 1em;
    white-space: pre;
}

.who {
    margin-bottom: 0.5em;
}

.connect {
    margin-top: 0.5em;
}
.message {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.button {
    background-color: orange;
    width: 10em;
    height: 4em;
    margin-top: 3em;
}
</style>
