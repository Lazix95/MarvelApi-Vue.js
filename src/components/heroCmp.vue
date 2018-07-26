<template>
<div class="thumbnaill">
    <img :src="src" :class="setClass">
    <p> {{ name }}</p>
</div>
</template>

 <script>
export default {
  props: {
    src: String,
    name: String
  },
  computed: {
    url: function() {
      console.log(this.src.toString());
      return this.src.toString();
    },
    setClass: function() {
      var str = this.src.split("/");
      if (str[str.length - 1] == "image_not_available.jpg") {
        return "imageNotFound";
      } else {
        return "";
      }
    }
  }
};
</script>

 
 <style lang="less" src="../less/heroCmp.less" scoped>
</style>
