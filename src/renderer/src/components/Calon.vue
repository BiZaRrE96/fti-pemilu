<script setup lang="ts">
    import { ref } from 'vue';
    import ButtonArray from './ButtonArray.vue';
    import Panel from './Panel.vue';

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

    const panel = ref(false);

    function togglePanelTrue() {
        panel.value = true;
    }

    function togglePanelFalse() {
        panel.value = false;
    }

    //Calon constructing utils
</script>

<template>
    <div>
        <h2 v-if="warning">{{ warning }}</h2>
        <img :src="imgSource" class="calon-img" @click="togglePanelTrue">
        <small>{{props.cid}}</small>
        <h1>"{{props.cname}}"</h1>
        <ButtonArray :cid="props.cid"/>
        <Panel v-if="panel" @closed="togglePanelFalse"></Panel>
    </div>
</template>