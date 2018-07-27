<template>
    <div class="modal" @click="closeModal()">
        <div class="modalContent" :style="{backgroundImage:'url('+src+')' }">
            <div class="textContent" @click="nextHero()" @click.shift="perviusHero()">
                 <h2>{{ modalData.name }}</h2>
                 <p>{{ description }}</p>
                 <p>List of movies where {{ name }} showed up:</p>
                 <ul >
                     <li v-for="event in modalData.events.items" :key="event.name">{{ event.name }}</li>
                 </ul>
                 <p v-if="isEmpty">List not available!!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "./../../main.js";

export default {
  data: function() {
    return {
      data: ""
    };
  },
  props: {
    modalData: Object,
    closeModal: Function,
    nextHero: Function,
    perviusHero: Function
  },
  computed: {
    src: function() {
      return (
        this.modalData.thumbnail.path + "." + this.modalData.thumbnail.extension
      );
    },
    description: function() {
      if (this.modalData.description.length < 1) {
        return "Description not available!!";
      } else {
        return this.modalData.description;
      }
    },
    name: function() {
      return this.modalData.name.split("(")[0];
    },
    isEmpty: function() {
      if (this.modalData.events.items.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  filters: {}
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
  > .modalContent {
    box-shadow: 10px 10px 69px -2px rgba(0, 0, 0, 0.75);
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    width: 25%;
    height: 50%;
    top: 50%;
    left: 50%;
    background-color: aqua;
    text-align: center;
    background-size: cover;
    > .textContent {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      position: absolute;
      top: 0;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      > p {
        padding: 0 25px;
      }
      > ul {
        width: 155px;
        margin: auto;
        padding: 0 40px;
      }
    }
  }
}
</style>
