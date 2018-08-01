<template>
<div><div class="thumbnaill" @mousemove="mouseCrd()">
    <img :src="src" :class="setClass" @click="openModal()">
    <div class="bookmark"><img :src="starSrc" @click="bookmark()" @mouseover="activeTooltip(true)" @mouseout="activeTooltip(false)"></div>
    <p> {{ data.name }}</p>
</div>
 <app-tooltip v-if="toolTipActive" :x="tooltipX" :y="tooltipY">{{ tooltipStr }}</app-tooltip>
</div>
</template>

 <script>
import { EventBus } from "./../main.js";
import tooltip from "./shared/tooltip.vue";

export default {
  data: function() {
    return {
      unbookmarked: require("../assets/img/empty star.png"),
      bookmarked: require("../assets/img/full star.png"),
      toolTipActive: false,
      bookmarkedString: "Bookmark",
      unbookmarkedStrung: "Unbookmark",
      tooltipX: "",
      tooltipY: ""
    };
  },
  props: {
    data: Object,
    arrayOfIds: Array
  },
  computed: {
    url: function() {
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
    src: function() {
      return this.data.thumbnail.path + "." + this.data.thumbnail.extension;
    },
    starSrc: function() {
      var isBkm = this.arrayOfIds.includes(this.data.id);
      var starSrc = isBkm ? this.bookmarked : this.unbookmarked;
      this.tooltip = "Unbookamrk";
      return starSrc;
    },
    tooltipStr: function() {
      var str = this.bookmarkedString;
      if (this.arrayOfIds.includes(this.data.id)) {
        str = this.unbookmarkedStrung;
      }
      return str + "\n" + " " + this.data.name.split("(")[0];
    }
  },
  methods: {
    bookmark: function() {
      EventBus.$emit("bookmarked", this.data);
    },
    activeTooltip: function(state) {
      this.toolTipActive = state;
    },
    openModal: function() {
      EventBus.$emit("openModal", this.data);
    },
    mouseCrd: function() {
      this.tooltipX = parseInt(event.pageX);
      this.tooltipY = parseInt(event.pageY);
    }
  },
  components: {
    appTooltip: tooltip
  }
};
</script>

 <style lang="less" src="../less/heroCmp.less" scoped>
</style>
