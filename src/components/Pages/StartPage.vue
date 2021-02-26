<template>
  <div id="game">
    <h1>Square's game</h1>

    <div class="field" :class="{'bad': conf.initBoxesCount > maxBoxes}" >
      <label for="sCount">Initial Boxes count (max: {{maxBoxes}})</label>
      <input id='sCount'
             v-model="conf.initBoxesCount"
             min="2"
             :max="maxBoxes"
             type="number"
             @keyup="validate"
             @change="validate">
    </div>

    <div class="field" :class="{'bad': conf.initBoxSize > windowHeight}">
      <label for="boxSize">Initial Box Size (max: {{windowHeight/2}})</label>
      <input id='boxSize'
             v-model="conf.initBoxSize"
             min="1"
             :max="windowHeight"
             type="number"
             @keyup="validate"
             @change="validate">
    </div>

    <div class="field" >
      <label for="minSize">Min Box size</label>
      <input id='minSize'
             v-model="conf.minBoxSize"
             min="1"
             :max="conf.initBoxSize"
             type="number"
             @keyup="validate"
             @change="validate">
    </div>

    <div class="field">
      <button type="submit" @click="start" :disabled="isStartDisabled">Start Game</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "StartPage",
  data() {
    return {
      isStartDisabled: false
    }
  },
  computed: {
    ...mapState([
      'conf',
    ]),
    windowHeight() {
      return window.innerHeight
    },
    maxBoxes() {
      const xBoxes = Math.floor(window.innerWidth / this.conf.initBoxSize);
      const yBoxes = Math.floor(window.innerHeight / this.conf.initBoxSize);
      return xBoxes * yBoxes
    },

  },
  methods: {
    validate() {
        const toMuch = this.conf.initBoxesCount >= this.maxBoxes
        const toBig = this.conf.initBoxSize >= this.windowHeight / 2
        const toBigMinimumSize = this.conf.minBoxSize >= this.conf.initBoxSize
        this.isStartDisabled = toMuch || toBig || toBigMinimumSize
    },
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
  margin-right: 1em;
}

input {
  min-width: 14em;
}

#game {
  width: 50vw;
  padding: 2em;
  margin: 0 auto;
}

.field {
  display: flex;
  justify-content: flex-end;
  margin: 1em 20% 1em 1em;
}

.bad {
  color: red;
}
</style>