<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
//import { USER_REQUEST } from '@/store/actions/user'
export default {
    name: 'app',
    /*
    created: function () {
        axios.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized, logout the user
                    this.$store.dispatch(AUTH_LOGOUT)
                    // you can also redirect to /login if needed !
                }
            throw err;
        });
    });


    if (this.$store.getters.isAuthenticated) {
        this.$store.dispatch(USER_REQUEST);
    }
    }*/
}
</script>

<style>
@import url('https://rsms.me/inter/inter-ui.css');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    font-size: 100%;
    font-family: 'Inter UI', sans-serif;
}
.app {
    width: 62em;
    max-width: 100%;
    margin: 0 auto;
    padding: 2em 6em 8em;
    background-color: #0074d9;
    border-top: 4px solid #0be6d7;
    color: white;
}
h1 {
    font-size: 8em;
    font-weight: 100;
}
h2 {
    font-size: 6em;
    font-weight: 100;
}
p {
    font-size: 2em;
    font-weight: normal;
}
</style>
