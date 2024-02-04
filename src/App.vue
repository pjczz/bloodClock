<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<script lang="scss">
#app {
  height: 100%;
  width:100vw;
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  // disable all animations
  &.static *,
  &.static *:after,
  &.static *:before {
    transition: none !important;
    animation: none !important;
  }
}
</script>
