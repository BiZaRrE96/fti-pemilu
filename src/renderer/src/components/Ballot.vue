<script setup lang="ts">
    import Calon from './Calon.vue';

    const props = defineProps<{
        calons: string[];
    }>();

    import { ref } from 'vue';

    const animate = ref(false);

    function animateToggle(message) {
        animate.value = !animate.value
    }
</script>

<template>
    <h1>"Choose your kahim..."</h1>
    <div style="text-align:center">
        <button style="display: inline-block" @click="animateToggle">Begin!</button>
    </div>
    <ul class="calon-list">
        <li v-for="calon in props.calons" class="calon" :class="{'fade-in-zoom': animate}">
            <Calon :cname="calon" />
            <small>{{ calon }}</small>
        </li>
    </ul>
</template>