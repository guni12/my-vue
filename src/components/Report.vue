<template>
<main>
    <Nav />
    <h2>{{ $route.params.kmom }}</h2>
    <div class="question" v-for="question in questions" :key="question.key">
      <p><strong>{{ question.question }}</strong></p>

      <div class="answer" v-for="ans in question.answer" :key="ans.key">
        <p>{{ ans }}</p>
      </div>

    </div>
</main>

</template>

<script>
import Nav from './Nav.vue'
export default {
  name: 'Report',
  components: {
    Nav,
  },
  data() {
    return {
      questions: [],
    }
  },
  mounted() {
    this.getText(this.$route.params.kmom);
  },
  methods: {
    getText(kmom) {
      let that = this;
      that.text = "";
      fetch("https://redovisa.guni.me/reports/" + kmom)
      .then(function(response) {
          return response.json();
      })
      .then(function(result) {
          // eslint-disable-next-line
          console.log(result);
          var test = result.data.questions;
          test = JSON.parse(test);
          that.questions = test.map((question, index) => {
            return {
              key: index,
              question: question.question,
              answer: question.answer
            };
          });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-transform: uppercase;
}
.question {
  margin-bottom: 2em;
}
</style>
