<template>
     <div class="heroHolder">
        <app-hero v-for="heroe in heroes" :key="heroe.id" :data="heroe" :arrayOfIds="arrayOfIds">
        </app-hero>
    </div>
</template>

<script>
import { EventBus } from "../main.js";
import hero from "./heroCmp.vue";

export default {
  data: function() {
    return {
      heroes: "",
      bookmarkedArray: [],
      arrayOfIds: []
    };
  },
  components: {
    appHero: hero
  },
  created() {
    EventBus.$on("getApi", data => {
      this.heroes = data;
    });
    EventBus.$on("bookmarked", data => {
      if (!this.arrayOfIds.includes(data.id)) {
        this.bookmarkedArray.push(data);
        this.arrayOfIds.push(data.id);
        this.saveToLocalStorage();
      } else {
        var i = this.bookmarkedArray.map(item => item.id).indexOf(data.id);
        this.bookmarkedArray.splice(i, 1);
        i = this.arrayOfIds.indexOf(data.id);
        this.arrayOfIds.splice(i, 1);
        this.saveToLocalStorage();
      }
    });
  },
  mounted() {
    const data = JSON.parse(this.$localStorage.get("bookmarkedArray"));
    const dataId = JSON.parse(this.$localStorage.get("arrayOfIds"));
    if (data) {
      this.arrayOfIds = dataId;
      this.bookmarkedArray = data;
      console.log(this.arrayOfIds);
    }
  },
  methods: {
    saveToLocalStorage: function() {
      this.$localStorage.set("arrayOfIds", JSON.stringify(this.arrayOfIds));
      this.$localStorage.set(
        "bookmarkedArray",
        JSON.stringify(this.bookmarkedArray)
      );
    }
  }
};
</script>

<style lang="less" scoped>
.heroHolder {
  width: 1050px;
  text-align: center;
  margin: auto;
}
</style>
