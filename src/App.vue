<template>
  <div id="app">
   <app-menu></app-menu>
   <app-hero></app-hero>
   <app-buttons></app-buttons>
  </div>
</template>

<script>
import menu from "./components/shared/menu.vue";
import hero from "./components/heroesList.vue";
import buttons from "./components/shared/controllButtons.vue";

export default {
  name: "app",
  components: {
    appMenu: menu,
    appHero: hero,
    appButtons: buttons
  }
};
</script>

<style lang="scss">
div {
  text-align: center;
}
</style>
