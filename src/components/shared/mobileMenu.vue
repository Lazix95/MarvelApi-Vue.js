<template>
<nav class="mobileNavbar">
    <h2 >Bookmark Your Favorite Heroes!!</h2>
    <div>
        <allHeroesButton v-if="!showHeroes"  @click.native="showAllHeroes()"></allHeroesButton>
        <bookmarkedHeroesButton v-if="showHeroes" @click.native="bookmarkedHeroes()"></bookmarkedHeroesButton>
        <input type="text" placeholder="Search Heroes!" id="js-search" v-model="name" @focus="resetOffset()">
    </div>
</nav>
</template>

<script src="../../js/menu.js" scoped>
</script>

<!--  Menu Styling  -->
<style lang="less" scoped>
@backgroundColor: #ffe4c4;
.mobileNavbar {
  background-color: @backgroundColor;
  text-align: center;
  position: relative;
  > h2 {
    display: inline-block;
  }
  div {
    overflow: auto;
    position: relative;
    > input {
      padding: 5px 10px;
      border: none;
      border-radius: 10px;
      margin: 15px auto 20px 50px;
      vertical-align: text-bottom;
      margin-bottom: 10px;
    }
    > button {
      margin: 0 50px 12px auto;
      position: unset;
    }
  }
}

@media screen and (max-width: 599px) {
  .mobileNavbar > div {
    > input {
      margin-left: 15px;
    }
    > button {
      margin-right: 15px;
    }
  }
}

@media screen and (max-width: 441px) {
  .mobileNavbar > div {
    > input {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
    > button {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
}
</style>