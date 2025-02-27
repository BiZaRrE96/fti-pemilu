<script setup lang="ts">
import Keypad from './components/Keypad.vue';
    function finishAuth() {
        window.challenge.sendAuthChallenge(6969);
    }
</script>

<template>
    <h1>Welcome cuh</h1>
    <button @click="finishAuth"> Challenge </button>
    <Keypad/>
</template>
