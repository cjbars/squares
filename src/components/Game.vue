<template>
  <div class="game" @click="addBox">
    <box-item
        v-for="box in boxes.values()"
        :angle="box.angle"
        :is-winner="isWin"
        :size="box.size"
        :x="box.x"
        :y="box.y"
    />
    <div v-if="isWin||isGameOver">
      <h1 v-if="isWin" class="game_win">You are Win!!!</h1>
      <h1 v-if="isGameOver" class="game_over">Game Over :(</h1>

      <router-link to="/">Play again</router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import BoxItem from "@/components/BoxItem";
import Box from "@/utils/Box";
import randomAngle from "@/utils/RandomAngle";

export default {
  name: "Game",
  components: {
    BoxItem
  },
  computed: {
    ...mapState(['boxes', 'isWin', 'isGameOver', 'conf', 'epoch']),
  },
  methods: {
    addBox(event) {
      const box = new Box(
          event.clientX,
          event.clientY,
          this.conf.initBoxSize,
          randomAngle(),
          5
      )
      this.$store.commit('ADD_BOX', box)
    }
  },
  watch: {
    epoch: function () {
      this.$forceUpdate()
    }
  },
  mounted() {
    if (!this.boxes.size) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
.game {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}

.game_over {
  font-size: 3em;
  color: black;
}

.game_win {
  font-size: 3em;
  color: green;
}
</style>