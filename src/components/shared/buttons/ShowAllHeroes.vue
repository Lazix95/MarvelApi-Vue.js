<template>
    <button>
      <img src="./../../../assets/img/full star.png"><img src ="../../../assets/img/empty star.png">
      <p>Browse All Heroes!!</p>
      </button>
</template>

<script>
export default {
  props: {
    allHeroes: Function
  }
};
</script>

<style lang="less" scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  > img {
    height: 35px;
    width: 35px;
    float: left;
  }
  > p {
    float: left;
  }
}
</style>
