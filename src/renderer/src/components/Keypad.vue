<template>
    <div class="keypad">
      <button v-for="num in orderedNumbers" :key="num" @click="pressKey(num)">
        {{ num }}
      </button>
      <button @click="reset">Reset</button>
      <button @click="pressKey(0)">0</button>
      <button @click="send">Send</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        input: '',
        orderedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
    },
    methods: {
      pressKey(num) {
        this.input += num;
      },
      reset() {
        this.input = '';
      },
      send() {
        console.log("Sending:", this.input);
        this.input = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 150px;
  }
  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  </style>
  