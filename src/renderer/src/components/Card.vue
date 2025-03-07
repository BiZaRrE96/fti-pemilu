<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue';

const clicked = ref(false);
function flipme() {
    clicked.value = !clicked.value;
    console.log("Clicky")
}

//import { defineProps } from 'vue';
/*
interface Props {
  cid?: number
}

const props = withDefaults(defineProps<Props>(), {
  cid: 0
})
*/
const position = ref({ top: 0, left: 0, width: 0, height: 0 });

const card = useTemplateRef("zero")

onMounted(() => {
    if (card.value){
        const rect = card.value.getBoundingClientRect();
        position.value = {
            top: rect.top,    // Distance from top of the viewport
            left: rect.left,  // Distance from left of the viewport
            width: rect.width,
            height: rect.height
        };

        console.log("True Position:", position.value);
    }
});

</script>

<template>
    <div class="card-container" :class="{'cardzoom' : clicked}">
        <div class="card" @click="flipme" ref="zero">
            <div class="front">
                <slot name="front">
                    <h1 class="default">
                        FRONT
                    </h1>
                </slot>
                
            </div>
            <div class="back">
                <slot name="back">
                    <h1 class="default">
                        BACK
                    </h1>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="css">
    .card-container {
    position: absolute;
    min-width: 20dvw;
    min-height: 25dvh;
    display: block;
    transition: min-width 0.6s ease, min-height 0.6s ease, left 0.6s ease, top 0.6s ease;
    }

    .card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1s ease-in-out;
        border: 10px solid white;
    }

    .front, .back {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        backface-visibility: hidden;
    }

    .front {
        background-color: red;
        transform: rotateY(0deg);
        left: 0;
    }

    .back {
        background-color: blue;
        transform: rotateY(180deg);
        right: 0
    }

    .card-container.cardzoom {
        min-width: 80dvw;
        min-height: 80dvh;
        left: 10dvw;
        top: 10dvh;

        .card {
            transform: rotateY(-180deg);
        }
    }


</style>