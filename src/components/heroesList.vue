<template>
     <div class="heroHolder">
       <app-modal v-if="modalOpend" :modalData="modalData" :closeModal="closeModal" :nextHero="nextHero" :perviusHero="perviusHero"></app-modal>
        <app-hero v-if="!searching && index>min && index<max" v-for="(hero, index) in heroes" :key="hero.id" :data="hero" :arrayOfIds="arrayOfIds">
        </app-hero>
        <app-loading-screen v-if="searching"></app-loading-screen>
    </div>
</template>

<script>
import { EventBus } from "../main.js";
import hero from "./heroCmp.vue";
import animation from "./shared/loadingScreen";
import modal from "./shared/HeroInfo.vue";

export default {
  data: function() {
    return {
      heroes: "",
      bookmarkedArray: [],
      arrayOfIds: [],
      searching: false,
      searchEmpty: true,
      modalOpend: false,
      modalData: "",
      min: -1,
      max: 20,
      step: 20
    };
  },
  components: {
    appHero: hero,
    appLoadingScreen: animation,
    appModal: modal
  },
  created() {
    EventBus.$on("getApi", (data, searching) => {
      if (!this.searchEmpty) {
        this.heroes = data;
        this.searching = searching;
      } else {
        this.searching = searching;
        this.heroes = this.bookmarkedArray;
        this.resetRange();
        if (this.bookmarkedArray.length > this.max) {
          EventBus.$emit("buttonsOn", true);
        } else {
          EventBus.$emit("buttonsOn", false);
        }
      }
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
    EventBus.$on("searching", searching => {
      this.searching = searching;
    });
    EventBus.$on("searchEmpty", data => {
      this.searchEmpty = data;
    });
    EventBus.$on("goForward", data => {
      if (this.searchEmpty && this.bookmarkedArray.length > this.max) {
        this.min += this.step;
        this.max += this.step;
      }
    });
    EventBus.$on("goBack", data => {
      if (this.searchEmpty && this.min > -1) {
        this.min -= this.step;
        this.max -= this.step;
      }
    });
    EventBus.$on("openModal", data => {
      this.modalData = data;
      this.modalOpend = true;
    });
  },
  mounted() {
    const data = JSON.parse(this.$localStorage.get("bookmarkedArray"));
    const dataId = JSON.parse(this.$localStorage.get("arrayOfIds"));
    if (data) {
      this.arrayOfIds = dataId;
      this.bookmarkedArray = data;
      if (this.searchEmpty) {
        if (data.length > this.max) {
          EventBus.$emit("buttonsOn", true);
        }
        this.heroes = data;
      }
    }
  },
  methods: {
    saveToLocalStorage: function() {
      this.$localStorage.set("arrayOfIds", JSON.stringify(this.arrayOfIds));
      this.$localStorage.set(
        "bookmarkedArray",
        JSON.stringify(this.bookmarkedArray)
      );
    },
    resetRange: function() {
      this.min = -1;
      this.max = this.step;
    },
    nextHero: function() {
      var next = this.bookmarkedArray
        .map(item => item.id)
        .indexOf(this.modalData.id);
      if (this.bookmarkedArray[next + 1]) {
        this.modalData = this.bookmarkedArray[next + 1];
      }
    },
    perviusHero: function() {
      var next = this.bookmarkedArray
        .map(item => item.id)
        .indexOf(this.modalData.id);
      if (this.bookmarkedArray[next - 1]) {
        this.modalData = this.bookmarkedArray[next - 1];
      }
    },
    closeModal: function() {
      if (event.target.className == "modal") {
        this.modalOpend = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.heroHolder {
  width: 1040px;
  text-align: center;
  margin: auto;
  overflow: auto;
  padding: 0 30px;
}
</style>
