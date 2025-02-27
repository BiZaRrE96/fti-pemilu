<script setup lang="ts">
    import { error } from 'console';
import Calon from './Calon.vue';
    import {onMounted, provide, reactive } from 'vue';

    const props = defineProps<{
        calons?: string[];
    }>();

    var pickList : number[] = reactive([])

    function resetPickList(expectedSize : number) {
        if (pickList){
            for (let i = 0; i < expectedSize; i++) {
            pickList.push(0)
            }
        }
    }

    const loadSound = new Audio('/loaded.mp3')
    const errorSound = new Audio('/Error.mp3')
    
    function loadSoundPlay() {
        loadSound.currentTime = 0;
        loadSound.play();
    }

    function errorSoundPlay() {
        errorSound.currentTime = 0;
        errorSound.play();
    }

    onMounted(() => {
        //CalonListFetcher
        if (props.calons) {
            resetPickList(props.calons.length)
            console.log("Resetted, now has size",pickList?.length,"(",props.calons.length,")")
            loadSoundPlay();
        }
        else {
            console.warn("Calons not included!")
            errorSoundPlay();
        }

        provide("pickList",pickList)
    })
    
</script>

<template>
    <div v-if="calons" :class="'fade-in-zoom'">
        <h1>"Choose your kahim..."</h1>
        <ul class="calon-list">
            <li v-for="(calon,index) in props.calons" class="calon">
                <Calon :cname="calon" :cid="index+1"/>
                <small>{{ calon }}</small>
            </li>
        </ul>
    </div>
    <div v-else>
        <h2> Failed to fetch calon list...</h2>
    </div>
</template>