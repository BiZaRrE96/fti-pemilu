<script setup lang="ts">
import Ballot from './components/Ballot.vue'

const exampleCalon : string[] = ["Dewa","Cunt","Catto"]

function testPing(_ : Event) : void {
  window.test.testPing().then((value? : number) => console.log(value))
}

function fetchCalonList(_ : Event) : void {
  window.calon_utils.calonList().then((value? : any) => {
    console.log(value)
  })
}

</script>

<template>
  <h1>Penis</h1>
  <button @click="testPing"> TestPing </button>
  <button @click="fetchCalonList"> fetchCalonList </button>
  <Ballot :calons="exampleCalon"/>
</template>
