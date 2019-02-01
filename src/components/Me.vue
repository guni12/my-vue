<template>
<main>
    <Nav />
    <h1>Me</h1>
    <div class="me-text" v-for="tes in test" :key="tes.key">
    <p>{{ tes.paragraph }}</p>
    </div>
    <p>{{ author }}</p>
</main>
</template>

<script>
import Nav from './Nav.vue'
export default {
  name: 'Me',
  props: { },
  components: {
      Nav,
  },
  data() {
    return {
        author: "",
        test: ""
    }
  },
  mounted() {
    this.getMe();
  },
  methods: {
    getMe() {
      let that = this;
      that.author = "";
      that.test = "";
      fetch("https://redovisa.guni.me")
      .then(function(response) {
          return response.json();
      })
      .then(function(result) {
          // eslint-disable-next-line
          console.log(result);
          that.author = result[0].name;
          that.test = result[0].description.map((item, index) => {
            return {
              key: index,
              paragraph: item
            };
          });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
