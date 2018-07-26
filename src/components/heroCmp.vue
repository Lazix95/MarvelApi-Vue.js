<template>
<div class="thumbnaill">
    <img :src="src" :class="setClass">
    <div class="bookmark"><img :src="starSrc" @click="bookmark()"></div>
    <p> {{ data.name }}</p>
</div>
</template>

 <script>
import { EventBus } from "./../main.js";
 
export default {
  data:function(){
    return{
        unbookmarked: require('../assets/img/empty star.png'),
        bookmarked: require('../assets/img/full star.png')
        
    }
  },
  props: {
    data:Object,
    arrayOfIds:Array
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
    },
    src:function(){
      return this.data.thumbnail.path +"."+ this.data.thumbnail.extension;
    },
  starSrc:function(){
    var isBkm = this.arrayOfIds.includes(this.data.id);
    var starSrc = isBkm ? this.bookmarked : this.unbookmarked;
    return starSrc;
  }
  },
  methods:{
    bookmark:function(){
        EventBus.$emit("bookmarked",this.data);
    } 
  },
};
</script>

 <style lang="less" src="../less/heroCmp.less" scoped>
</style>
