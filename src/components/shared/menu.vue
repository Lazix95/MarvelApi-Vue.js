<template>
<nav class="navbar">
    <h2>Bookmark Your Favorite Heroes!!</h2>
    <button>
      <img src="../../assets/img/full star.png"><img src ="../../assets/img/empty star.png">
      <p>Browse All Heroes!!</p>
      </button>
    <input type="text" placeholder="Search Heroes!" id="js-search" v-model="name" @focus="resetOffset()">
</nav>
</template>

<script src="../../js/menu.js">
</script>

<!--  Menu Styling  -->
<style lang="less" src="../../less/menu.less" scoped>
</style>



