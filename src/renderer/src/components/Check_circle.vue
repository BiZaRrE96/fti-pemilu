<script setup lang="ts">
import { onMounted } from 'vue';

// Courtesy of https://codepen.io/xristouz/pen/dybGXdd
const emits = defineEmits(['animationend']);

  onMounted(() => {
    let timer = setTimeout(() => {
      console.log("Timer finished!");
      emits('animationend');
      clearTimeout(timer);
    }, 2000);
  });

</script>

<template>
    <div class="container">
        <svg id="Layer_2" class="on" viewBox="0 0 84 84"><circle class="cls-1" cx="42" cy="42" r="41"/></svg>
        
        <svg id="Layer_1" class="on" viewBox="0 0 24 19">
        <polyline class="cls-2" points="2.09 9.56 8.3 15.77 22.19 1.87"/>
        </svg>
    
    </div>
</template>

<style lang="css" scoped>

.cls-1{fill:none;stroke:#229959;stroke-miterlimit:10;stroke-width:2px;}

.cls-2{fill:none;stroke:#229959;stroke-miterlimit:10;stroke-width:1.5px;}

body {
  text-align: center;
  background: #fff;
}

svg {
  position: absolute;
  display: block;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 92px;
  height: 92px;
   
  #Layer_1 {
    width: 42px;
    position: relative;
    stroke-dasharray: 30;
    stroke-dashoffset: 30;

    &.on {
      animation: check .5s;
      animation-delay: 1.2s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }
  }

  #Layer_2 {
    width: 84px;
    stroke-dasharray: 258;
    stroke-dashoffset: 258;
    transform: rotate(270deg);
    
    &.on {
      animation: circle 1.4s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes circle {
  0% {
    stroke-dashoffset: 258;
    transform: rotate(90deg);
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes check {
  0% {
    stroke-dashoffset: 30;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

</style>