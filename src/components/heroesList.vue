<template>
     <div class="heroHolder">
        <app-hero v-for="heroe in heroes" :key="heroe.id" :src='heroe.thumbnail.path +"."+ heroe.thumbnail.extension' :name="heroe.name">
        </app-hero>
    </div>
</template>

<script>
import { EventBus } from "../main.js";
import hero from "./heroCmp.vue";

export default {
  data: function(){
    return{
      heroes:""
    }
  },
  components: {
    appHero: hero
  },
  created(){
  EventBus.$on('getApi',(data) => {
  this.heroes = data;
})
  }
};
</script>

<style lang="less" scoped>
    .heroHolder{
        width: 1050px;
        text-align: center;
        margin: auto;
    }
</style>
