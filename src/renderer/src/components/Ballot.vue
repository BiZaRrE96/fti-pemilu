<script setup lang="ts">
    import { error } from 'console';
    import Calon from './Calon.vue';
    import {onMounted, provide, reactive, ref } from 'vue';
    import HoldButton from './HoldButton.vue';
    import { read } from 'fs';

    // Props are like, defining what you can supply to this object
    const props = defineProps<{
        calons?: string[];
    }>();

    // Whether backend has replied with a calon list or not
    // In hindsight there needs to be a "fail" status
    const ready = ref(false);

    // Basically, the list that holds current selection
    var pickList : number[] = reactive([])

    function resetPickList(expectedSize : number) {
        if (pickList){
            for (let i = 0; i < expectedSize; i++) {
            pickList.push(0)
            }
        }
    }

     // Sound stuff

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
    // End of sound stuff

    // This only gets called once, when the component gets loaded ykyk
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
        console.log("Provided picklist")
        ready.value = true
    })

    function submit() {
        console.log(pickList)
    }
    
</script>

<template>
    <div v-if="ready" :class="'fade-in-zoom'">
        <h1>"Choose your kahim..."</h1>
        <ul class="calon-list">
            <!-- The div that holds all of the calons, buttons are inside Calon object -->
            <li v-for="(calon,index) in props.calons" class="calon">
                <Calon :cname="calon" :cid="index+1"/>
                <small>{{ calon }}</small>
            </li>
        </ul>
        <!-- Submission button -->
        <HoldButton @held="submit" :hold-time="1500">
        Hold To Submit!
        </HoldButton>
    </div>
    <div v-else>
        <h2> Attempting to fetch calon list...</h2>
    </div>
</template>