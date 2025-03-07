<script setup lang="ts">
import Keypad from './components/Keypad.vue';
import { ref } from 'vue';
    function finishAuth() {
        window.challenge.sendAuthChallenge(6969);
    }
    /* Legacy testing code
    function fakesend(str : string) : void {
        console.log("Fakesend triggered :: %s",str);
        return
    }
    */
    function sendAuth(str : string) : void {
        window.challenge.sendAuthChallenge(str);
        return
    }

    const disp = ref('') //string display

    function displayInput(input : string) : void {
        disp.value = " " + "*".repeat(input.length) + " "
    }

</script>

<template>
    <!-- Youre not supposed to be here -->
    <h1>Welcome cuh</h1>
    <button @click="finishAuth"> Challenge </button>
    <h2>{{ disp }}</h2>
    <Keypad :onsend="sendAuth" @update-value="displayInput"/>
</template>
