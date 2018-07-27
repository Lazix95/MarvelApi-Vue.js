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
      searching: false,
      heroes: "",
      empty: false
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
          this.searching = false;
          EventBus.$emit("getApi", result.data.data.results, this.searching);
          this.heroes = result.data.data.results;
        },
        error => {
          this.searching = false;
          console.error(error);
        }
      );
    },
    resetOffset: function () {
      this.offset = 0;
    }
  },
  watch: {
    name() {
      if (this.name.length < 1) {
        EventBus.$emit("searchEmpty", true);
      } else {
        EventBus.$emit("searchEmpty", false);
      }
      if (!this.searching) {
        this.searching = true;
        EventBus.$emit("searching", this.searching);
        this.search();
      }
    }
  },
  created() {
    EventBus.$on("goForward", () => {
      if (this.heroes.length > 19 && this.name.length > 0) {
        this.offset = parseInt(this.offset) + 20;
        console.log(this.offset);
        EventBus.$emit("searching", true);
        this.search();
      }
    });
    EventBus.$on("goBack", () => {
      if (this.offset > 10) {
        this.offset = parseInt(this.offset) - 20;
        console.log(this.offset);
        EventBus.$emit("searching", true);
        this.search();
      }
    });
  },
};
