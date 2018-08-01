<template>
    <div class="controll">
        <button v-if="isShowBack" @click="goBack">Back</button>
        <button v-if="isShowForward" @click="goForward">Forward</button>
    </div>
</template>

<script>
import { EventBus } from "../../main.js";

export default {
  data: function() {
    return {
      isShowForward: false,
      isShowBack: false,
      searchEmpty: false
    };
  },
  methods: {
    goForward: function() {
      EventBus.$emit("goForward", true);
    },
    goBack: function() {
      EventBus.$emit("goBack", true);
    }
  },
  created() {
    EventBus.$on("getApi", (data, searching, offset) => {
      if (!this.searchEmpty) {
        this.isShowForward = !searching;
        this.isShowBack = !searching;
      }
      if (data.length < 19) {
        this.isShowForward = false;
      }
      if (offset < 1) {
        this.isShowBack = false;
      }
    });
    EventBus.$on("searching", searching => {
      this.isShowForward = !searching;
      this.isShowBack = !searching;
    });
    EventBus.$on("buttonsOn", data => {
      this.isShowForward = data;
      this.isShowBack = data;
    });
    EventBus.$on("searchEmpty", data => {
      this.searchEmpty = data;
    });
    EventBus.$on("forwardOff", data => {
      this.isShowForward = data;
    });
  }
};
</script>

<style lang="less" scoped>
.controll {
  width: 100%;
  text-align: center;
  margin: 10px 0 50px 0;
  > button {
    margin: 10px;
    border-radius: 5px;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  .buttonDisabled {
    background-color: #737579;
    border-color: #737579;
  }
  > .active {
    background-color: #28a745;
    border-color: #28a745;
  }
}
</style>
