<script setup lang="ts">
import Keypad from './components/Keypad.vue';
import HoldButton from './components/HoldButton.vue';
import { ref } from 'vue';
    function finishAuth() {
        window.challenge.sendAuthChallenge(6969);
    }

    function fakesend(str : string) : void {
        console.log("Fakesend triggered :: %s",str);
        return
    }

    function sendAuth(str : string) : void {
        window.challenge.sendAuthChallenge(str);
        return
    }

    const disp = ref('')

    function displayInput(input : string) : void {
        disp.value = input
    }

</script>

<template>
    <h1>Welcome cuh</h1>
    <button @click="finishAuth"> Challenge </button>
    <HoldButton>
        Hold me
    </HoldButton>
    <h2>{{ disp }}</h2>
    <Keypad :onsend="sendAuth" @update-value="displayInput"/>
</template>
