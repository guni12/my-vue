<template>
<nav>
    <ul>
        <li><router-link to="/">Me</router-link></li>
        <li><router-link to="/login">Logga in</router-link></li>
        <li v-if='isAuthenticated' @click="logout"><span v-if='isAuthenticated'>Logga ut</span></li>
        <li><router-link to="/reports">Skriv</router-link></li>
        <li><router-link to="/update">Ed</router-link></li>
        <li><router-link to="/reports/kmom01">kmom01</router-link></li>
        <li><router-link to="/reports/kmom02">kmom02</router-link></li>
        <li><router-link to="/reports/kmom03">kmom03</router-link></li>
    </ul>
</nav>
</template>

<script>
//import { mapGetters, mapState } from 'vuex'
//import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
    name: 'Nav',
    props: { },
    methods: {
        logout: function () {
            localStorage.removeItem('token');
            this.isAuthenticated();
            window.location = '/login';
        },
        isAuthenticated: function() {
            var bol = false;
            if (localStorage.getItem('token')) {
                bol = true;
            }
            return bol;
        }
    },
    /*
    computed: {
      ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
      ...mapState({
        authLoading: state => state.auth.status === 'loading',
        name: state => `${state.user.profile.title} ${state.user.profile.name}`,
      })
    },*/
    computed: {
        showNav() {
            var res = this.isAuthenticated();
            // eslint-disable-next-line
            console.log("computed", res);
            return res;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}
li {
    display: inline;
    margin-right: 1em;
}
li a {
    text-decoration: none;
    color: white;
    font-size: 1.4em;
}
li a:hover {
    text-decoration: underline;
}
</style>
