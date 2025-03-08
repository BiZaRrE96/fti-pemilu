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
             <button v-if="props.showexit" @click="() => {flip()}" class="txtbutton">
                <!--Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
             </button>
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
    .exitclick {
        position: static;
        left: 0;
        top: 0;
        width: 100dvw;
        height: 100dvh;
        background-color: black;
        opacity: 5%;
        z-index: 8;
    }

    .txtbutton {
        font-weight: bold;
        background: none;
        border: 0;
        color: white;
        width: 1dvw;
        cursor: pointer;
    }

    .lepanel {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(49, 98, 169, 0.90);
        color: black;
        z-index: 10;
        /* Target
        width: 60dvw;
        height: 60dvh;
        */

        border: 2.5dvw;
        border-radius: 25px;

        span {
            width: auto;
            display: flex;
            flex-grow: 1;
            padding: 10% 10%;
            color: white;
        }
        .title {
            display: flex;
            flex-grow: 0;
            justify-content: space-between;
            padding: 5% 10%;
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
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        opacity: 0;
        animation-timing-function: ease-out;
    }
    50% {
        left: 20%;
        top: 40%;
        width: 60%;
        height: 20%;
    }
    100% {
        left: 0%;
        top: 0%;
        width: 100%;
        height: 100%;
        opacity: 1;
        animation-timing-function: ease-in;
    }
}
</style>