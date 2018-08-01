<template>
    <div>
        <h1>There is no result for " <slot></slot> "</h1>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
h1 {
  font-family: monospace;
  font-style: inherit;
  transform: translateY(-50%) translateX(-50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
