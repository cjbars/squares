<template>
  <div id="game">
    <h1>Square's game</h1>

    <div :class="{'bad': conf.initBoxesCount > maxBoxes}" class="field">
      <label for="sCount">Initial Boxes count</label>
      <input id='sCount' v-model="conf.initBoxesCount" :max="maxBoxes" type="number">
    </div>

    <div class="field">
      <label for="maxSquares">Initial Box Size</label>
      <input id='maxSquares' v-model="conf.initBoxSize" type="number">
    </div>

    <div class="field">
      <label for="minSize">Min Box size</label>
      <input id='minSize' v-model="conf.minBoxSize" type="number">
    </div>

    <div class="field">
      <button type="submit" @click="start">Start Game</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "StartPage",
  computed: {
    ...mapState([
      'conf',
    ]),
    maxBoxes() {
      let xBoxes = Math.floor(window.innerWidth / this.conf.initBoxSize);
      let yBoxes = Math.floor(window.innerHeight / this.conf.initBoxSize);
      return xBoxes * yBoxes
    },

  },
  methods: {
    start() {
      this.$store.dispatch('start', this.conf)
          .then(() => {
            this.$router.push({path: '/game'})
          })
    }
  }
}
</script>

<style scoped>
label {
  margin-right: 10px;
}

input {
  padding: 3px;
}

#game {
  width: 30%;
  padding: 2em;
  margin: 0 auto;
}

.field {
  display: flex;
  justify-content: flex-end;
  margin: 1em;
}

.bad {
  color: red;
}
</style>