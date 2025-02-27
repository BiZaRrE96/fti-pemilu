<script setup lang="ts">
import { Component } from 'vue';

</script>

<template>
    <div class="card">
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
</template>

<style lang="css">
    .card{
        min-width: 20dvh;
        min-height: 25dvh;
        width: max-content;
        height: max-content;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 2.0s;
        border: 10px solid white;
    }

    .front, .back {
        position: absolute;
        width: min-content;
        height: min-content;
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

    .default {
        display: block;
        width: 10dvh;
        height: 15dvh;
    }

    .card:hover {
        transform: rotateY(-180deg);
    }

</style>