<template>
<main>
    <Nav />
    <h2>Logga in här:</h2>
    <div class="login-text" >
        <form v-on:submit.prevent="getLogin">
          <!-- name -->
          <div class="field">
            <label class="label">Name</label><br />
            <input type="text" class="input" name="email" v-model="email">
          </div>

          <!-- password -->
          <div class="field">
            <label class="label">Password</label><br />
            <input type="password" class="input" name="pass" v-model="pass">
          </div>

          <!-- submit button -->
          <div class="field has-text-right">
            <button type="submit" class="button">Submit</button>
          </div>
        </form>
    </div>
</main>
</template>

<script>
import Nav from './Nav.vue'

export default {
    name: 'Login',
    props: { },
    components: {
        Nav
    },
    data() {
        return {
            email: "",
            pass: ""
        }
    },
    mounted() {
        this.getLogin();
    },
    methods: {
        getLogin() {
            let that = this;
            var url = 'https://redovisa.guni.me/login';
            var userstring = 'email=' + that.email + '&password=' + that.pass;
            //console.log(userstring);
            var res = "";
            return fetch(url, {
                method: "POST",
                body: userstring,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            }).then(function(response) {
                return response.json();
            })
            .then(function(result) {
                //console.log(result);
                res = { token: result.data.token };
                localStorage.setItem('token', JSON.stringify(res));
                window.location = '/';
            })
            .catch(function(e) {
                // eslint-disable-next-line
                console.log("error", e);
            });
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
input {
    width: 100%;
    height: 3em;
    font-size: 1.2em;
    padding-left: 1em;
}
p {
    font-size: 1.5em;
}

.button {
    float: right;
    background-color: red;
    width: 10em;
    height: 4em;
    margin-top: 3em;
}
</style>
