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
                <button type="submit" id="close" class="button" name="close" @click.self.prevent="getClose">Close</button>
            </div>
        </form>


        <form id="form2">
            <!-- message -->
            <div class="field message">
                    <label class="label message">Send message:<br />Free text, or<br />/nick new-nick<br />/all<br />/private friends_nick Your private message</label><br />
                    <input id="message" type="text" placeholder="message" name="message" v-model="message">
            </div>


            <!-- submit button -->
            <div class="field base">
                <button type="submit" class="button" name="send_message" @click.self.prevent="getSend">Send</button>
                <button type="submit" class="button" name ="show_saved" @click.self.prevent="showSaved">Show old</button>
                <pre id="json" class="json"></pre>
                <button type="submit" class="button" name="delete_saved"
                @click.self.prevent="deleteSaved">Delete all</button>
                <pre id="json" class="json">{{ json }}</pre>
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
            savedme: "",
            json: ""
        }
    },
    mounted() {
        this.scrollToEnd();
    },
    methods: {
        getConnect(/*event*/) {
            // console.log(event);
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
            that.scrollToEnd();
        },

        getSend(event) {
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }
            let that = this;
            let messageText = that.message;
            let save = true;
            let cont = messageText;
            let priv = false;
            let friend = "";


            if (messageText.indexOf('/nick') == 0) {
                let nickname_array = messageText.split(' ')
                if (nickname_array.length >= 2) {
                    let newname = nickname_array[1];
                    that.nic = newname;
                    that.who = "Nickname " + newname + "'s page";
                }
                save = false;
            }
            if (messageText.indexOf('/all') == 0) {
                save = false;
            }
            if (messageText.indexOf('/private') == 0) {
                let private_array = messageText.split(/ (.+)/);
                friend = private_array[1];
                let who_array = friend.split(/ (.+)/);
                friend = who_array[0]
                cont = who_array[1];
                priv = true;
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
            let now = new Date();
            let timestamp = now.toLocaleTimeString();
            if (save == true) {
                that.saveMessage(cont, timestamp, that.nic, priv, friend);
            }
        },

        saveMessage(cont, time, nick, priv, friend) {
            let tosave = {
                "message": cont,
                "time": time,
                "nick": nick,
                "private": priv,
                "friend": friend
            };
            tosave = JSON.stringify(tosave);

            //let inserturl = 'http://localhost:1347/insert';
            let inserturl = 'https://my-ws.guni.me/insert';
            fetch(inserturl, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: tosave
            })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                // eslint-disable-next-line
                console.log(data)
            })
        },

        showSaved(event) {
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }
            let that = this;
            //let address = 'http://localhost:1347/list';
            let address = 'https://my-ws.guni.me/list';
            fetch(address)
            .then(response => {
            // eslint-disable-next-line
                console.log(response);
                if (response.ok) return response.json();
            })
            .then(data => {
                // eslint-disable-next-line
                console.log(JSON.stringify(data, null, 2));
                // eslint-disable-next-line
                data.forEach(x => console.log(x));
                let safe = [];
                data.forEach((x) => {
                    if (x.private == false) {
                        safe.push(x);
                    }
                    that.json = JSON.stringify(safe, null, 2);
                });
            })
        },


        deleteSaved(event) {
            if (!event) {
                // don't submit
                event.preventDefault();
                return false;
            }
            let that = this;
            //let address = 'http://localhost:1347/list';
            let address = 'https://my-ws.guni.me/drop';
            fetch(address)
            .then(response => {
            // eslint-disable-next-line
                console.log(response);
                if (response.ok) return response;
            })
            .then(data => {
                // eslint-disable-next-line
                console.log(JSON.stringify(data, null, 2));
                json.innerHTML = JSON.stringify(data, null, 2);
            })
        },

        scrollToEnd() {
            let container = document.querySelector(".json");
            let scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
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
.base {
    min-height: 18em;
}

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

pre.json {
    float: right;
    margin-top: 0.5em;
    margin-bottom: 1em;
    white-space: pre;
    max-height: 25em;
    overflow: scroll;
    margin-bottom: 1em;
}

</style>
