import {
  EventBus
} from "../main.js";
import axios from "axios";
var CryptoJS = require("crypto-js");
var ts = new Date();

export default {
  data: function () {
    return {
      ts: ts.getTime(),
      privateKey: "9fd5811393dc346ad7bed4b3543078f24a353061",
      publicKey: "92bf368a68c00ab3cf0a9bc0f6538777",
      limit: "20",
      offset: "0",
      name: "",
      searching: true,
      heroes: ""
    };
  },
  computed: {
    hashString: function () {
      return this.ts + this.privateKey + this.publicKey;
    },
    hash: function () {
      return CryptoJS.MD5(this.hashString).toString();
    },
    nameStartsWith: function () {
      if (this.name.length < 1) {
        return "";
      } else {
        return "nameStartsWith=" + this.name + "&";
      }
    }
  },
  methods: {
    search: function () {
      var curentName = this.name;
      axios({
        method: "GET",
        url: "https://gateway.marvel.com/v1/public/characters?" +
          this.nameStartsWith +
          "limit=" +
          this.limit +
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
            this.search();
          }
          this.searching = true;
          EventBus.$emit("getApi", result.data.data.results);
          this.heroes = result.data.data.results;
        },
        error => {
          this.searching = true;
          console.error(error);
        }
      );
    }
  },
  watch: {
    name() {
      if (this.searching) {
        this.searching = false;
          this.search();
      }
    }
  },
  created() {
    EventBus.$on("goForward", () => {
      if (this.heroes.length > 19) {
        this.offset = parseInt(this.offset) + 20;
        console.log(this.offset)
        this.search();
      }
    });
    EventBus.$on("goBack", () => {
      if (this.offset > 10) {
        this.offset = parseInt(this.offset) - 20;
        console.log(this.offset)
        this.search();
      }
    })
  },
};
