<template>
<header>
        <h2>Bookmark Your Favorite Heroes!!</h2>
        <app-hamburger class="navBurger" @click.native="mobileNavActive = !mobileNavActive, mobile = !mobileNavActive" :isActive="!mobileActiveCheck"></app-hamburger>
        <div class="navBurger" v-if= false>
            <p v-html="burger" @click="mobile = !mobile"></p>
        </div>
        <transition name="fade">
        <div class="navbarHolder" v-if="!mobile && mobileNavActive">
            <nav class="navbar">
               <allHeroesButton v-if="!showHeroes" @click.native="showAllHeroes()"></allHeroesButton>
               <bookmarked-heroes-button v-else @click.native="bookmarkedHeroes()" ></bookmarked-heroes-button>
                <input type="text" placeholder="Search Heroes!" id="js-search" value="" v-model="name" @focus="resetOffset()" @input="resetButton()">
            </nav>
        </div>
         </transition>
    </header>
</template>

<script>
import { EventBus } from "./../../main.js";
import axios from "axios";
import allHerosButton from "./buttons/ShowAllHeroes.vue";
import bookmarkedHeroesButton from "./buttons/showBookmarkedHeroes.vue";
import hamburger from "./buttons/hamburger";
var CryptoJS = require("crypto-js");
var ts = new Date();

export default {
  data: function() {
    return {
      ts: ts.getTime(),
      privateKey: "9fd5811393dc346ad7bed4b3543078f24a353061",
      publicKey: "92bf368a68c00ab3cf0a9bc0f6538777",
      limit: 20,
      offset: "0",
      name: "",
      searching: false,
      heroes: "",
      empty: false,
      showHeroes: false,
      burger: "&#9776",
      mobile: false,
      mobileNavActive: true
    };
  },
  computed: {
    hashString: function() {
      return this.ts + this.privateKey + this.publicKey;
    },
    hash: function() {
      return CryptoJS.MD5(this.hashString).toString();
    },
    nameStartsWith: function() {
      if (this.name.length < 1) {
        return "";
      } else {
        return "nameStartsWith=" + this.name + "&";
      }
    },
    mobileActiveCheck: function() {
      if (!this.mobile && this.mobileNavActive) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    search: function() {
      var curentName = this.name;
      axios({
        method: "GET",
        url:
          "https://gateway.marvel.com/v1/public/characters?" +
          this.nameStartsWith +
          "limit=" +
          (this.limit + 1) +
          "&offset=" +
          this.offset +
          "&apikey=" +
          this.publicKey +
          "&ts=" +
          this.ts +
          "&hash=" +
          this.hash +
          ""
      }).then(
        result => {
          if (this.name != curentName) {
            this.searching = true;
            EventBus.$emit("searching", this.searching, this.name);
            this.search();
          } else {
            this.searching = false;
            EventBus.$emit(
              "getApi",
              result.data.data.results,
              this.searching,
              this.offset
            );
            this.heroes = result.data.data.results;
            if (this.heroes.length < 21) {
              EventBus.$emit("forwardOff", false);
            }
          }
        },
        error => {
          this.searching = false;
          console.error(error);
        }
      );
    },
    resetOffset: function() {
      this.offset = 0;
    },
    resetButton: function() {
      this.showHeroes = false;
    },
    showAllHeroes: function() {
      this.searching = true;
      this.showHeroes = true;
      this.name = "";
      EventBus.$emit("searchEmpty", false);
      EventBus.$emit("searching", this.searching);
      this.search();
    },
    bookmarkedHeroes: function() {
      this.searching = true;
      this.showHeroes = false;
      EventBus.$emit("searchEmpty", true);
      EventBus.$emit("searching", this.searching);
      this.search();
    },
    mobileFnc: function() {
      var numb = window.innerWidth;
      if (numb < 992) {
        this.mobile = true;
        this.mobileNavActive = false;
        console.log("​.mobile", this.mobile);
      } else {
        this.mobile = false;
        this.mobileNavActive = true;
        console.log("​mobile", this.mobile);
      }
    }
  },
  watch: {
    name() {
      if (!this.showHeroes) {
        this.showHeroes = false;
        if (this.name.length < 1) {
          EventBus.$emit("searchEmpty", true);
        } else {
          EventBus.$emit("searchEmpty", false);
        }
        if (!this.searching) {
          this.searching = true;
          EventBus.$emit("searching", this.searching, this.name);
          this.search();
        }
      }
    }
  },
  created() {
    window.addEventListener("resize", this.mobileFnc, true);
    EventBus.$on("goForward", () => {
      if (
        this.heroes.length > 19 &&
        (this.name.length > 0 || this.showHeroes)
      ) {
        this.offset = parseInt(this.offset) + 20;
        EventBus.$emit("searching", true);
        this.search();
      }
    });
    EventBus.$on("goBack", () => {
      if (this.offset > 10) {
        this.offset = parseInt(this.offset) - 20;
        EventBus.$emit("searching", true);
        this.search();
      }
    });
  },
  components: {
    allHeroesButton: allHerosButton,
    bookmarkedHeroesButton: bookmarkedHeroesButton,
    appHamburger: hamburger
  }
};
</script>

<!--  Menu Styling  -->
<style lang="less" scoped>
@backgroundColor: #ffe4c4;

.fade-enter-active,
.fade-leave-active {
  max-height: 68px;
  transition: all 0.5s;
  @media (max-width: 480px) {
    transition: all 0.8s;
    max-height: 118px;
  }
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  max-height: 0;
}

.show-enter {
  max-height: 0;
}
.show-enter-active {
  transition: max-height 1s;
}
.show-leave-to {
}
.show-leave-active {
}

header {
  height: 68px;
  background-color: @backgroundColor;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  > h2 {
    position: absolute;
    z-index: 999;
    transform: translateX(-50%);
    left: 50%;
  }
  > .navBurger {
    position: absolute;
    top: 5px;
    right: 40px;
    display: none;
    padding: 10px 10px 20px 10px;
    > p {
      font-size: 25px;
      margin: 0;
    }
  }
  > .navbarHolder > .navbar {
    width: 100%;
    height: 68px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: @backgroundColor;
    overflow: auto;
    text-align: center;
    position: relative;
    > button {
      position: absolute;
      left: 10px;
      top: 10px;
      border-radius: 10px;
      background: transparent; //  border: none;
      cursor: pointer;
      > img {
        height: 35px;
        width: 35px;
        float: left;
      }
      > p {
        float: left;
      }
    }
    > input {
      padding: 5px 10px;
      border: none;
      border-radius: 10px;
      margin: 20px;
      position: absolute;
      right: 10px;
    }
    > h2 {
      display: inline-block;
    }
  }
}

@media screen and (max-width: 991px) {
  header {
    min-height: 68px;
    text-align: center;
    width: 100%;
    overflow: hidden;
    height: unset;
    > h2 {
      position: unset;
      z-index: unset;
      transform: none;
      left: unset;
    }
    > .navBurger {
      display: block;
    }
    .navbarHolder {
      width: 100%; // height: 68px;
      // transition: all 1s;
      // max-height: 0;
    }
    > .navBurger:hover ~ .navbarHolder,
    .navbarHolder:hover {
      // border-top: 1px solid rgba(201, 193, 193, 0.548);
      //max-height: 150px;
    }
  }
}

@media (max-width: 599px) {
  header {
    > h2 {
      font-size: 18px;
      margin: 25px 0;
    }
  }
}

@media screen and (max-width: 480px) {
  header {
    > h2 {
      font-size: 15px;
    }
    .navbarHolder {
      > .navbar {
        height: auto;
        > button {
          position: unset;
          display: block;
          margin: 15px auto;
        }
        > input {
          position: unset;
          display: block;
          margin: 15px auto;
        }
      }
    }
    > .navBurger {
      right: 20px;
    }
  }
}

@media screen and (max-width: 399px) {
  header {
    > h2 {
      display: inline-block;
      margin-right: 40px;
    }
    .navbarHolder {
      > .navbar {
        height: auto;
        > button {
          position: unset;
          display: block;
          margin: 15px auto;
        }
        > input {
          position: unset;
          display: block;
          margin: 15px auto;
        }
      }
    }
  }
}
</style>



