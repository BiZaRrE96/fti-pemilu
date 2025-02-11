<script setup lang="ts">
import { ref, reactive } from 'vue'
import Ballot from './components/Ballot.vue'
import { provide } from 'vue'

const exampleCalon : string[] = ["Dewa Nanda Putu","Cunt","Catto"]

function testPing(_ : Event) : void {
  window.test.testPing().then((value? : number) => console.log(value))
}

function fetchCalonList(_ : Event) : void {
  window.calon_utils.calonList().then((value? : any) => {
    console.log(value)
  })
}

  const start = ref(false);
</script>

<template>
  <h1>Penis</h1>
  <button @click="testPing"> TestPing </button>
  <button @click="fetchCalonList"> fetchCalonList </button>
  <button @click="(_event) => {console.log('Fuck yeah!')}">Inline fucn test</button>
  <div style="text-align:center">
      <button style="display: inline-block" @click="(_event) => {start= !start}">Begin!</button>
  </div>
  <transition name="fade-out" mode="out-in">
    <div v-if="!start" key="waiting">Awaiting signal...</div>
  </transition>

  <transition name="fade-in">
    <div v-if="start" class="wrapper">
      <Ballot :calons="exampleCalon" key="ballot"/>
    </div>
  </transition>
</template>

<style>
/* Exit Animation */
.fade-out-leave-active {
  transition: opacity 1.5s ease;
}
.fade-out-leave-to {
  opacity: 0;
}

/* Enter Animation */
.fade-in-enter-active {
  transition: opacity 1.5s ease, max-height 3.0s ease-in-out;
}
.fade-in-enter {
  opacity: 0;
  max-height: 10dvh;
}
.fade-in-enter-to {
  opacity: 1;
  max-height: 100dvh;
}
</style>