<script setup lang="ts">

  const props = defineProps<{
          onsend? : (arg0 : string) => boolean;
      }>();

  var input = ''
  const orderedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  function pressKey(num : number) {
    input += num.toString();
  }
  function reset() {
    input = '';
  }
  function send(onsend? : (arg0 : string) => boolean) {
    if (onsend) {
      console.log("Onsend proc:", input);
      onsend(input);
    } else {
      console.log("Sending:", input);
    }
    input = '';
  }

  function attemptSend() {
    if (props.onsend) {
      console.log("exists")
      send(props.onsend)
    } else {
      console.log("doesnt exist")
      send()
    }
  }

  function reportProps() {
    console.log(props)
  }

</script>

<template>
    <div class="keypad">
      <button v-for="num in orderedNumbers" :key="num" @click="pressKey(num)">
        {{ num }}
      </button>
      <button @click="reset">Reset</button>
      <button @click="pressKey(0)">0</button>
      <button @click="attemptSend">Send</button>
    </div>
    <button @click="reportProps">rep props</button>
  </template>
  
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
  