<script setup lang="ts">
    import { ref } from 'vue';
    import ButtonArray from './ButtonArray.vue';
    import Panel from './Panel.vue';

    // Props are like, defining what you can supply to this object
    const props = defineProps<{
        cname?: string;
        cid: number;
    }>();
    var desc;
    var warning : string
    const imgSource = ref('https://placehold.co/200x300')

    if (props.cname){
        window.calon_utils.calonImage(props.cname).then((value) => {
        imgSource.value = value;
        }).catch((reason) => {
            console.error(reason)

            warning = "Couldnt load image!"
        })

        window.calon_utils.calonDesc(props.cname).then((value) => {
            desc = value;
        }).catch((reason) => {
            desc = "Failed to load desc" + reason;
        })
    }
    

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
        <div class="calontop">
            <h2 v-if="warning">{{ warning }}</h2>
            <img :src="imgSource" class="calon-img" @click="togglePanelTrue">
            <h2>{{props.cname}}</h2>
            <Panel v-if="panel && desc" @closed="togglePanelFalse">{{ desc }}</Panel>
        </div>
        <div style="height: 10%; width: 100%;">
            <ButtonArray :cid="props.cid"/>
        </div>
</template>