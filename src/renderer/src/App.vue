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

function save() : void {
  window.calon_utils.saveSelection().then((_value) => {
      console.log("Succesfully written!")
    }).catch((reason) => {console.log(reason)})
}

  const start = ref(false);
  const complete = ref(false);
</script>

<template>
    <div v-if="!start && !complete" key="waiting" style="width: 80%; display: flex; align-items: center; flex-direction: column; overflow: hidden;">
      <h1>MTI Voting App</h1>
      Awaiting signal...
      <div style="text-align:center">
        <button style="display: inline-block" @click="(_event) => {start= !start}">Begin!</button>
      </div>
    </div>
    <div v-else-if="start || complete" class="wrapper" style="width: 80%;">
      <div v-if="complete">
        Completed!
        <button @click="() => {complete=false}">Restart</button>
      </div>
        <Ballot v-else-if="start" :calons="calonList" key="ballot" @onSubmit="() => {console.log('Submitted');start = false; complete = true;}"/>
      </div>
    <div>
      Posible problem has occured.
      <button @click="save">Save</button>
    </div>
</template>


<style>
.wrappar {
  background-color: red;
  width: min-content;
  overflow: hidden;
  transition: max-height 2.0s ease-in-out;
  height: 100%;
}

.wrapper {
  background-color: rgba(25,25,25,0.15);
  backdrop-filter: blur(5px);
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