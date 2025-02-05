<script setup lang="ts">
import Ballot from './components/Ballot.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
const exampleCalon : string[] = ["Dewa","Cunt","Catto"]

</script>

<template>
  <h1>Penis</h1>
  <Ballot :calons="exampleCalon" />
</template>
