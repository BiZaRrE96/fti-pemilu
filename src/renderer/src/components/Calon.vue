<script setup lang="ts">
    import ButtonArray from './ButtonArray.vue';
    const props = defineProps<{
        cname?: string;
    }>();
</script>

<template>
    <div> 
        <img :src="'https://placehold.co/200x300'">
        <h1>"Halo aku {{props.cname}}"</h1>
        <ButtonArray />
    </div>
</template>