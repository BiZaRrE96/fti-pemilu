<script setup lang="ts">
import { ref } from 'vue'
import Ballot from './components/Ballot.vue'
import Card from './components/Card.vue'

//const exampleCalon : string[] = ["Dewa Nanda Putu","Cunt","Catto"]
var calonList;

// Get calon list from exposed API then set it to a var
window.calon_utils.calonList().then((value) => {calonList = value});

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

  const start = ref(false);
  const check = ref(true);
</script>

<template>
  <div style="text-align:center">
    <button style="display: inline-block" @click="(_event) => {start= !start}">Begin!</button>
  </div>
    <div v-if="!start" key="waiting">
      <h1>Penis</h1>
    <button @click="testPing"> TestPing </button>
    <button @click="fetchCalonList"> fetchCalonList </button>
    <button @click="(_event) => {console.log('Fuck yeah!')}">Inline fucn test</button>
    <button @click="(_event) => {dummification()}">Dummify to excel</button>
    <span><input type="checkbox" v-model="check" /> <label>Test</label></span>
    
      Awaiting signal...
      <div style="transition: all 2.0s; width: min-content;">
        <Card v-if="check"/>
        <h2 v-else> Card space </h2>
      </div>
      
      <div class="wrappar" :class="{ expanded: check, shrunken: !check }">
        <transition name="fadex" mode="out-in">
          <h1 v-if="check" key="big">BIG ASF YOO</h1>
          <h2 v-else key="small">I'm small...</h2>
        </transition>
      </div>

    </div>
    <div v-else class="wrapper">
      <Ballot :calons="calonList" key="ballot"/>
    </div>
</template>


<style>
.wrappar {
  background-color: red;
  width: min-content;
  overflow: hidden;
  transition: max-height 2.0s ease-in-out;
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
</style>