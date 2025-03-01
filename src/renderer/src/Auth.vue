<script setup lang="ts">
import Keypad from './components/Keypad.vue';
import HoldButton from './components/HoldButton.vue';
    function finishAuth() {
        window.challenge.sendAuthChallenge(6969);
    }

    function fakesend(str : string) : boolean {
        console.log("Fakesend triggered :: %s",str);
        return false
    }

    function sendAuth(str : string) : boolean {
        window.challenge.sendAuthChallenge(str);
        return true
    }

</script>

<template>
    <h1>Welcome cuh</h1>
    <button @click="finishAuth"> Challenge </button>
    <HoldButton>
        Hold me
    </HoldButton>
    <Keypad :onsend="sendAuth"/>
</template>
