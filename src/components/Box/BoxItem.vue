<template>
  <div
      :class="{'winner': isWinner}"
      :style="{
          background: `hsl(${hue}deg,100%,35%)`,
          width: size + 'px',
          height: size + 'px',
          top: y + 'px',
          left: x + 'px'
    }"
  >
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    x: {
      type: Number,
      required: true,
      default: 0
    },
    y: {
      type: Number,
      required: true,
      default: 0
    },
    size: {
      type: Number,
      required: true,
      default: 10
    },
    angle: {
      type: Number,
      required: true,
      default: 0
    },
    isWinner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hue() {
      return this.angle * 180 / Math.PI
    }
  }
}
</script>

<style scoped>
div {
  color: white;
  font-size: 12px;
  position: absolute;
}

.winner {
  top: 50% !important;
  left: 50% !important;
  transform: rotate(-45deg) scale(4);
  box-shadow: 2px 3px 3px #00000052;
}

</style>