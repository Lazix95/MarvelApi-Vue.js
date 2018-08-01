<template>
    <div :style="{top:cordY, left:cordX}" class="tooltip"><slot></slot></div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: ["x", "y"],
  computed: {
    cordY: function() {
      return this.y + 55 + "px";
    },
    cordX: function() {
      return this.x + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.tooltip {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  white-space: pre;
  color: #ffffff;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 5px 5px;
  border-radius: 10px;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 12px;
}
.tooltip::before {
  content: "";
  transform: translateX(-50%) translatey(30%) rotate(-180deg);
  left: 50%;
  top: -6.5px;
  position: absolute;
  border-width: 4px 6px 0 6px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
  z-index: 99;
}
</style>
