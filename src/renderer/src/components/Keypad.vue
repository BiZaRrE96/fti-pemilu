<script setup lang="ts">
import { ref } from 'vue';


  const props = defineProps<{
          onsend? : (arg0 : string) => void;
      }>();

  
  var input = ref('')

  // List of "emits" or @s, see vue for more
  const emit = defineEmits(['update-value']);

  const reportValue = () => {
    emit('update-value', input.value);
  };

  const orderedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  function pressKey(num : number) {
    input.value += num.toString();
    reportValue()
  }
  function reset() {
    input.value = '';
    reportValue()
  }
  function send(onsend? : (arg0 : string) => void) {
    if (onsend) {
      console.log("Onsend proc:", input);
      onsend(input.value);
    } else {
      console.log("Sending:", input);
    }
    input.value = '';
    reportValue()
  }

  function attemptSend() {
    if (props.onsend) { // whether the onsend function is supplied or not
      console.log("exists")
      send(props.onsend)
    } else {
      console.log("doesnt exist")
      send()
    }
  }
 //
  // function reportProps() {
  //   console.log(props)
  // }

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
</template>
  
  <style scoped>
  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.9% 1.6%;
    height: 40dvh;
    aspect-ratio: 302 / 403;

  }
  button {
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
    border-radius : 100%;
    aspect-ratio: 1 / 1;
  }
  </style>
  