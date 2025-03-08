<template>
    <button @mousedown="startHold" @mouseup="cancelHold" @mouseleave="cancelHold" :class="{pressing : progress > 0}" style="display: flex; justify-content: center; align-content: center; align-items: center;">
      <div v-if="!progress" style="color: white;"><slot>ABORT</slot></div>
      <div v-else class="progress"
        :style="{ width: (1 - progress / props.holdTime) * 100 + '%',
                opacity: (Math.min((props.holdTime - progress) / (props.holdTime/2), 1) * 100) + '%'}"
                >X</div>
    </button>
  </template>
  
  <script setup>
 import { ref } from 'vue';
  // Props are like, defining what you can supply to this object
  const props = defineProps({
    holdTime: {
      type: Number,
      default: 4000
    }
  });
  
  const emit = defineEmits(['held']);
  const holdTimer = ref(null);
  const progress = ref(0);
  let interval = null;

  const confirmingSound = new Audio('./Error.mp3')
  const defaultPitch = 1;
  confirmingSound.playbackRate = defaultPitch;
  confirmingSound.preservesPitch = false;

  var confirmInterval;
  function startConfirming() {
    confirmingSound.currentTime = 0;
    confirmingSound.play();
      confirmInterval = setInterval(() => {
        confirmingSound.currentTime = 0;
        confirmingSound.play();
        confirmingSound.playbackRate += 0.01
      }, 500)
  }

  function stopConfirming() {
    clearInterval(confirmInterval); 
    confirmingSound.pause();
    confirmingSound.playbackRate = defaultPitch;
  }
  
  const startHold = () => {
    cancelHold(); //Cancel for good measure
    startConfirming();
    progress.value = props.holdTime; // Reset for how long this should be held

    interval = setInterval(() => { // Tick every 10 ms, then kys when done
      progress.value -= 10;
      if (progress.value <= 0) {
        emit('held');
        cancelHold(); // Replace this with fancy done animations if want.
        // Theres a chance timeouts would be better for post animations, havent tested
        clearInterval(interval);
      }
    }, 10);
    
    /*
    holdTimer.value = setTimeout(() => { // creates a "timeout", gets called when time "runs out" or in this case held
      emit('held');
      cancelHold(); // Replace this with fancy done animations if want
    }, props.holdTime);
    */
  };
  
  const cancelHold = () => { // when hold is done or released
    if (holdTimer.value) {
      clearTimeout(holdTimer.value);
      holdTimer.value = null;
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    progress.value = 0;
    stopConfirming();
  };
  </script>
  
  <style scoped>
  button {
    font-size: 16px;
    cursor: pointer;
    background: #e10909;
    color: black;
    border: none;
    border-radius: 5px;
    position: relative; 
    transition: 0.25s cubic-bezier(.25,1.75,.75,1);
    width: 16dvw;
    height: 8dvh;
  }
  button:hover {
    width: 18dvw;
    height: 9dvh;
  }
  .progress {
    border: none;
    border-radius: 5px;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #920808;
    overflow: hidden;
  }
  .pressing {
    color: rgba(0,0,0,0);
  }
  </style>
  