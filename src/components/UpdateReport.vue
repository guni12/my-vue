<template>
<main>
    <Nav />
    <h2>Uppdatera i nödfall kmom:</h2>
    <div class="login-text" >
        <form v-on:submit.prevent="createText">
          <!-- text -->
          <div class="field">
          <label class="label">Kmom i formen - kmom0x</label><br />
            <input type="text" class="input-text" name="kmom" v-model="kmom">
            <label class="label">Rapporten som json:</label><br />
            <textarea class="input input-area" name="json" v-model="json"></textarea>
          </div>

          <!-- submit button -->
          <div class="field has-text-right">
            <button type="submit" class="button">Submit</button>
          </div>
        </form>

            <b-form-textarea id="textarea1"
                     v-model="text"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
            </b-form-textarea>
            <pre class="mt-3">{{ text }}</pre>
    </div>
</main>
</template>

<script>
import Nav from './Nav.vue'
export default {
    name: 'CreateReport',
    props: { },
    components: {
        Nav
    },
    data() {
        return {
            kmom: "",
            json: ""
        }
    },
    mounted() {
        this.createText();
    },
    methods: {
        createText() {
            let that = this;
            var url = "https://redovisa.guni.me/reports/update";
            var repstring = 'kmom=' + that.kmom + '&json=' + that.json;
            var storedtoken = JSON.parse(localStorage.getItem('token'));
            if (that.kmom) {
                //console.log(that.kmom);
                try {
                    fetch(url, {
                        method: 'POST',
                        body: repstring,
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': storedtoken,
                        }),
                    }).then(function(response) {
                        return response.json();
                    })
                    .then(function(result) {
                        if (result.data) {
                            //console.log(result);
                            /*
                            var message = result.data.message;
                            console.log(message);*/
                        }
                    });
                }
                catch(error) {
                    // eslint-disable-next-line
                    console.error(error);
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-text {
    background-color: orange;
    padding: 1em;
    margin: 1em;
}
input, .input {
    width: 100%;
    height: 3em;
    font-size: 1.2em;
    padding-left: 1em;
}
.input-area {
    height: 8em;
}
p {
    font-size: 1.5em;
}
h2 {
    font-size: 2em;
}

.button {
    float: right;
    background-color: red;
    width: 10em;
    height: 4em;
    margin-top: 3em;
}
</style>
