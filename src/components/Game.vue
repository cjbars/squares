<template>
  <div class="game" @click="addBox">
    <box-item
         :class="{'box_winner': isWin}"
         v-for="box in boxes"
         :x="box.x"
         :y="box.y"
         :size="box.size"
         :angle="box.angle"
         :isBad="box.isBad"
    />
   <div class="game_over" v-if="isGameOver"> Game over (</div>
   <div class="game_win" v-if="isWin"> You are Win!!! </div>
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
    ...mapState(['boxes', 'isWin', 'isGameOver', 'conf'])
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
  mounted() {
    if (!this.boxes.length) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
.game{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}
.game_over{
  font-size: 3em;
  color: black;
}
.game_win{
  font-size: 3em;
  color: green;
}
.box_winner{
    transform: rotate(-45deg);
}
</style>