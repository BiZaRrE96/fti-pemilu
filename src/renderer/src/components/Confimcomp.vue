<template>
    <div class="confirm-container">
      <!-- Checkbox (Always Visible) -->
        <Check_circle @animationend="showText" />
      <!-- Title Bar (Expands from Right) -->
      <transition name="expand">
        <div v-if="showTitle" class="title-bar">
          <span class="hidden-title">
            <h2 style="margin: 0 5%;">Thank you for voting!</h2>
          </span>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  import Check_circle from "./Check_circle.vue";
  
  const showTitle = ref(false);
  
  function showText() {
    setTimeout(() => {
      showTitle.value = true;
      setTimeout(() => {
        emits('animationend');
        }, 1000);
    }, 500); // Delay title expansion
  }

  const emits = defineEmits(['animationend'])

  const successAudio = new Audio('./success.mp3');

  onMounted(() => {successAudio.currentTime = 0; successAudio.play()})
  </script>
  
  <style scoped>
  .confirm-container {
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    width: fit-content;
    align-items: center;
    overflow: hidden;
  }
  
  /* Expanding Title Bar */
  .title-bar {
    height: 40px; /* Fixed height */
    width: 25dvw;
    overflow: hidden;
    display: block;
    transition: width 0.5s ease-in-out;
  }

  .hidden-title {
    width: 100%;
    height: 100%;
    margin: 0;
    display: inline-block;
    animation: reveal 0.5s ease-out;
  }
  
  /* Transition Animations */
  .expand-enter-active {
    transition: max-width 1s ease-in-out;
  }
  
  .expand-enter-from {
    max-width: 0;
  }
  
  .expand-enter-to {
    max-width: 50dvw; /* Expand to full width */
  }

  @keyframes reveal {
    0% {
      transform: translateX(25dvw);
      opacity: 100%;
      color: white;
    }
    50%{
      opacity: 50%;
    }
    100% {
      transform: translateX(0);
      opacity: 100%;
      color: initial
    }
  }
  </style>
  