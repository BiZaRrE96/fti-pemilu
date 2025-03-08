<template>
    <button @mousedown="startHold" @mouseup="cancelHold" @mouseleave="cancelHold" class="hbutton" :class="{pressing : progress > 0}">
        <slot>Hold me!</slot>
      <div v-if="progress > 0" class="progress"
        :style="{ width: (1 - progress / props.holdTime) * 100 + '%',
                opacity: (Math.min((props.holdTime - progress) / (props.holdTime/2), 1) * 100) + '%'}"
                ></div>
    </button>
  </template>
  
  <script setup>
 import { ref } from 'vue';
  
  // Props are like, defining what you can supply to this object
  const props = defineProps({
    holdTime: {
      type: Number,
      default: 2000 // Default hold time of 2 seconds
    }
  });
  
  const emit = defineEmits(['held']);
  const holdTimer = ref(null);
  const progress = ref(0);
  let interval = null;

  const confirmingSound = new Audio('./confirming.mp3')
  const defaultPitch = 0.5;
  confirmingSound.playbackRate = defaultPitch;
  confirmingSound.preservesPitch = false;

  var confirmInterval;
  function startConfirming() {
      confirmInterval = setInterval(() => {
        confirmingSound.currentTime = 0;
        confirmingSound.play();
        confirmingSound.playbackRate += 0.05
      }, 150)
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
        //emit('held');
        //cancelHold(); // Replace this with fancy done animations if want.
        // Theres a chance timeouts would be better for post animations, havent tested
        // Yeah future me here, moved this shit to set time out to prevent multi pings
        clearInterval(interval);
      }
    }, 10);

    holdTimer.value = setTimeout(() => { // creates a "timeout", gets called when time "runs out" or in this case held
      emit('held');
      cancelHold(); // Replace this with fancy done animations if want
    }, props.holdTime);

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
    background: #D9D9D9;
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
    position: absolute;
    top: 0%;
    left: 0%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #B9B9B9;
  }
  .pressing {
    color: rgba(0,0,0,0);
  }

  .hbutton{
    border: 2px solid black;
  }
  </style>
  