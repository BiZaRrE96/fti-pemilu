<script setup lang="ts">
import { ref } from 'vue';

    //Example : <Panel @closed="() => {console.log('Closed bruh')}"/>

    interface prop {
        panelname? : string;
        showexit? : boolean;
    }

    const props = withDefaults(defineProps<prop>(),{
        panelname : "Info",
        showexit : true
    })

    const emit = defineEmits(['closed'])

    const opening = ref(true);
    const closing = ref(false);

    function flip() {
        opening.value = false;
        setTimeout(() => {
            closing.value = true;
        }, 10);
    }

    function handleAnimationEnd() {
    if (closing.value) {
        emit('closed')
    }
}

</script>

<template>
    <div class="lepanel" :class="{open : opening, close : closing}" @animationend="handleAnimationEnd">
        <span class="title">
            <!-- The thing at top of panels; titlebars -->
             {{ props.panelname }}
             <button v-if="props.showexit" @click="() => {flip()}">< Return</button>
        </span>
        <span>
            <slot>
                Text here bub
            </slot>
            <!-- Content -->
        </span>
    </div>
</template>

<style lang="css" scoped>
    .lepanel {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 20dvw;
        top: 20dvh;
        width: 60dvw;
        height: 60dvh;
        background-color: cornsilk;
        opacity: 75%;
        color: black;
        z-index: 10;
        /* Target
        width: 60dvw;
        height: 60dvh;
        */

        border: 2.5%;
        border-radius: 25px;

        span {
            display: flex;
            flex-grow: 1;
            padding: 2.5% 2.5%;
        }
        .title {
            display: flex;
            flex-grow: 0;
            justify-content: space-between;
            padding: 1% 5%;
        }
    }

    .lepanel.open {
        animation: openpanel 0.5s ease-out;
        animation-direction: normal;
        animation-fill-mode: both;
    }

    .lepanel.close {
        animation: openpanel 0.25s ease-in;
        animation-direction: reverse;
        animation-fill-mode: both;
    }

    @keyframes openpanel {
    0% {
        left: 50dvw;
        top: 50dvh;
        width: 0;
        height: 0;
        opacity: 0;
        animation-timing-function: ease-out;
    }
    50% {
        left: 30dvw;
        top: 40dvh;
        width: 40dvw;
        height: 20dvh;
    }
    100% {
        left: 20dvw;
        top: 20dvh;
        width: 60dvw;
        height: 60dvh;
        opacity: 1;
        animation-timing-function: ease-in;
    }
}
</style>