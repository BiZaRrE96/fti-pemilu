<script setup lang="ts">
import { ref } from 'vue'
import Ballot from './components/Ballot.vue'
import Keypad from './components/Keypad.vue'
import Confimcomp from './components/Confimcomp.vue'
//import Card from './components/Card.vue'

//const exampleCalon : string[] = ["Dewa Nanda Putu","Cunt","Catto"]
var calonList;

// Get calon list from exposed API then set it to a var
window.calon_utils.calonList().then((value) => {calonList = value});

// Legacy dev testing functions 
/*
function testPing(_ : Event) : void {
  window.test.testPing().then((value? : number) => console.log(value))
}

// Legacy testing funcs
function fetchCalonList(_ : Event) : void {
  window.calon_utils.calonList().then((value? : any) => {
    console.log(value)
  })
}

// Legacy testing funcs
function dummification() : void {
  try {
    window.calon_utils.dummyDataTest();
    window.calon_utils.saveSelection().then((_value) => {
      console.log("Succesfully written!")
    }).catch((reason) => {console.log(reason)})
  }
  catch (e){
    console.warn(e)
  }
  
}
*/

  function save() : void {
    window.calon_utils.saveSelection().then((_value) => {
        console.log("Succesfully written!")
      }).catch((reason) => {console.log(reason)})
  }

  const start = ref(false);
  const complete = ref(false);
  const animend = ref(false);
  const disp_keypad = ref(false);
  const aborted = ref(false);

  function start_restart(code : string) : void {
    if (window.auth(code)) {
      complete.value=false;
      start.value=false;
      animend.value=false;
      disp_keypad.value=false;
      aborted.value=false;
    }
  }

</script>

<template>
  <Transition name="heightmaxxing" mode="out-in" style="animation-delay: 0">
    <div v-if="aborted" class="wrapper" style="background-color: rgba(255,0,0,0.25); width: 90dvw; height: 90dvh; justify-content: center;">
      <h1 style="color: white;"> ABORTED! </h1>
      <audio autoplay loop>
        <source src="/warning.mp3" type="audio/mp3">
      </audio>
      <Keypad :onsend="start_restart"/>
    </div>
    <div v-else-if="!start && !complete" key="waiting" class="wrapper clickable" @click="(_event) => {start= !start}">
      <h1>MTI Voting App</h1>
      Click me to start
      <hr>
    </div>
    <div v-else-if="complete" class="conf_panel wrapper-lite" :class="{'reveal-pad' : disp_keypad}">
      <div class="conf_panel">
        <Confimcomp @animationend="() => {animend = true; disp_keypad = false}"/>
        <Transition name="heightmaxxing">
          <h3 v-if="animend" style="background-color: rgba(180,180,180,0.75); font-weight: 500; padding: 0 5%;" @click="() => {disp_keypad = !disp_keypad}">{{!disp_keypad ? 'Show' : 'Hide'}} reset panel</h3>
        </Transition>
      </div>
      <Transition name="widthmaxxing">
        <Keypad v-if="disp_keypad" :onsend="start_restart" class="lm-keypad" style="overflow: hidden; aspect-ratio: 3 / 4; gap: 0;"/>
      </Transition>
    </div>
    <div v-else-if="start" class="wrapper">
      <Ballot :calons="calonList" key="ballot" @onSubmit="() => {complete = true;start = false;}" @onAbort="() => {start = false; aborted = true;}" style="height: 90dvh;"/>
    </div>
    <div v-else class="wrapper">
      Posible problem has occured.
      <button @click="save">Save</button>
    </div>
  </Transition>
</template>


<style>

.conf_panel {
  height: 20dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.75s ease;
  transition-delay: 1s;
}

.conf_panel.reveal-pad {
  height: 40dvh;
  transition-delay: 0s;
}

.wrapper {
  background-color: rgba(100,100,100,0.30);
  backdrop-filter: blur(5px);
  /*transition: all 0.5s; */
  max-width: 100dvw;
  max-height: 100dvh;
  width: 80%; display: flex; align-items: center; flex-direction: column; overflow: hidden;
}

.wrapper-lite {
  display: flex; align-items: center; flex-direction: row; overflow: hidden;
  background-color: rgba(25,25,25,0.15);
  backdrop-filter: blur(5px);
  padding: 5% 2.5%;
}

.wrapper.shrink {
  max-width: 50dvw;
  max-height: 50dvh;
}

.shrunken {
  max-height: 0px; /* Adjust based on content */
}

.expanded {
  max-height: 100%; /* Adjust based on content */
}

/* Fade animation */
.fadex-enter-active, .fadex-leave-active {
  transition: opacity 0.5s ease;
}
.fadex-enter, .fadex-leave-to {
  opacity: 0;
}

/* Transition Animations */
.heightmaxxing-enter-active, .heightmaxxing-leave-active {
  transition: max-height 0.75s ease-in-out;
  transition-delay: 0s;
}
.heightmaxxing-leave-active {
  transition-delay: 0s;
}

.heightmaxxing-enter-from, .heightmaxxing-leave-to {
  max-height: 0;
}

.heightmaxxing-enter-to .wrapper-lite {
  padding: 5% 2.5%;
}
.heightmaxxing-enter-from .wrapper-lite {
  padding: 0;
}


.heightmaxxing-enter-to, .heightmaxxing-leave-from {
  max-height: 100dvh; /* Expand to full width */
}

.lm-keypad {
  margin-left: 2dvw;
}
  /* Transition Animations */
.widthmaxxing-enter-active, .widthmaxxing-leave-active {
  transition: all 1s;
  transition-delay: 1s;
  height: 100%;
}

.widthmaxxing-leave-active {
  transition-delay: 0s;
}

.widthmaxxing-enter-from, .widthmaxxing-leave-to {
  max-width: 0;
  margin-left: 0dvw;
}

.widthmaxxing-enter-to, .widthmaxxing-leave-from {
  max-width: 20dvw; /* Expand to full width */
  margin-left: 2dvw;
}

</style>