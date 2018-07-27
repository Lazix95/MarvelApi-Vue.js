<template>
    <svg width="250px"  height="250px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-eclipse" style="background: none;">
    <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#1d3f72" transform="rotate(312 50 51)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
    </path>
</svg>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
svg {
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
}
</style>


