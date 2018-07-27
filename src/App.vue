<template>
  <div id="app">
   <app-menu></app-menu>
   <app-hero ></app-hero>
   <app-buttons></app-buttons>
  </div>
</template>

<script>
import menu from "./components/shared/menu.vue";
import hero from "./components/heroesList.vue";
import buttons from "./components/shared/controllButtons.vue";
import { EventBus } from "./main.js";

export default {
  name: "app",
  data: function() {
    return {
      searching: false
    };
  },
  components: {
    appMenu: menu,
    appHero: hero,
    appButtons: buttons
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
}
div {
  text-align: center;
}
</style>
