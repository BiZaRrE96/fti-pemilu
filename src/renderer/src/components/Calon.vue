<script setup lang="ts">
    import { ref } from 'vue';
    import ButtonArray from './ButtonArray.vue';

    // Props are like, defining what you can supply to this object
    const props = defineProps<{
        cname?: string;
        cid: number;
    }>();

    var warning : string
    const imgSource = ref('https://placehold.co/200x300')

    window.calon_utils.calonImage(props.cname).then((value) => {
        imgSource.value = value;
    }).catch((reason) => {
        console.error(reason)

        warning = "Couldnt load image!"
    })

    //Calon constructing utils
</script>

<template>
    <div>
        <h2 v-if="warning">{{ warning }}</h2>
        <img :src="imgSource" class="calon-img">
        <small>{{props.cid}}</small>
        <h1>"{{props.cname}}"</h1>
        <ButtonArray :cid="props.cid"/>
    </div>
</template>