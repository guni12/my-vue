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
        let addr = "https://redovisa.guni.me/reports/" + this.$route.params.kmom;
        this.getText(addr);
    },
    methods: {
        getText(addr) {
            let that = this;
            that.text = "";
            fetch(addr)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                // eslint-disable-next-line
                //console.log(result);
                var test = result.data.questions;
                test = JSON.parse(test);
                that.questions = test.map((question, index) => {
                    return {
                    key: index,
                    question: question.question,
                    answer: question.answer
                    };
                });
            })
            .catch(function(e) {
                // eslint-disable-next-line
                console.log("error", e);
            });
        }
    },
    watch: {
        $route(to) {
            let that = this;
            that.text = "";
            let moved = "https://redovisa.guni.me" + to.path;
             //console.log(moved);
            fetch(moved).then(function(response) {
                return response.json();
            })
            .then(function(result) {
                // eslint-disable-next-line
                // console.log(result);
                var test = result.data.questions;
                test = JSON.parse(test);
                that.questions = test.map((question, index) => {
                    return {
                    key: index,
                    question: question.question,
                    answer: question.answer
                    };
                });
            })
            .catch(function(e) {
                // eslint-disable-next-line
                console.log("error", e);
            });
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
    width: 52em;
    margin: 0 auto;
    padding: 3em 3em 3em;
    background-color: #68722c;
    color: white;
}
h2 {
  text-transform: uppercase;
}
.question {
  margin-bottom: 2em;
}
p {
    font-size: 1em;
}
</style>
