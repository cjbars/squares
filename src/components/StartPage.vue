<template>
  <div class="wrapper">
    <h1>Square's game</h1>
    <div class="field" :class="{'bad': conf.initBoxesCount > maxBoxes}">
      <label for="sCount">Initial Boxes count</label>
      <input id='sCount' type="number" :max="maxBoxes" v-model="conf.initBoxesCount">
    </div>

    <div class="field">
      <label for="maxSquares">Initial Box Size</label>
      <input id='maxSquares' type="number" v-model="conf.initBoxSize">
    </div>

    <div class="field">
      <label for="minSize">Min Box size</label>
      <input id='minSize' type="number" v-model="conf.minBoxSize">
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
    }
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

  .wrapper {
    width: 50%;
    margin: 0 auto;
  }

  .field {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
  .bad{
    color: red;
  }
</style>