<template>
 <olmap/>
</template>

<script>
import Olmap from "./components/olmap.vue";

export default {
  name: 'app',
  components: {
    Olmap,
  }
}
</script>

<style>
 *{padding:0; margin:0;}
 html,body{
  height: 100%;
 }
 #app {
  height: 100%;
 }
</style>
