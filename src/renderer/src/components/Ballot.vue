<script setup lang="ts">
    import Calon from './Calon.vue';

    const props = defineProps<{
        calons?: string[];
    }>();
</script>

<template>
    <h1>"Choose your kahim..."</h1>
    <ul class="calon-list">
        <li v-for="calon in props.calons" class="calon">
            <Calon :cname="calon" />
            <small>{{ calon }}</small>
        </li>
    </ul>
</template>