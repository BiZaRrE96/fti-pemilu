<script setup lang="ts">
    import { inject } from 'vue';
    
    const props = defineProps<{
        cid?: number;
    }>();

    var pickList : number[] | undefined = inject("pickList");

    const size = pickList ? pickList.length : 0

    const abnormality = size && props.cid ? ((props.cid > size) ? true : false) : false

    function checkPress(order : number) : boolean {
        if (pickList && props.cid) {
            if (pickList[props.cid-1] === order) {
                return true
            }
        }
        return false
    }

    function update(order : number) {
        if (pickList && props.cid) {

            //If previously another calon was picked in this order, set their order to 0
            const existingIndex : number = pickList.indexOf(order)
            if (existingIndex != -1) {
                pickList[existingIndex] = 0;
                if (existingIndex === props.cid-1) {
                    console.log("RELEASING",props.cid)
                    return;
                }    
            }
            console.log("EXISTING INDEX",existingIndex)
            pickList[props.cid-1] = order;
        } else {
        }
        console.log("Calon number",(props.cid ? props.cid : -1),"is now picked as",order)
    }

    //used to return a string that represents the active picklist
    function printPicklist() : string {
        var retval = ""
        if (pickList) {
            for (let i = 0; i < pickList.length; i++){
                retval += "|" + (pickList[i])
            }
            retval += "|"
        } else {
            retval += "UNDEFINED PICKLIST/ERROR"
        }
        return retval
    }
</script>

<template>
    <h1 v-if="abnormality">ABNORMALITY DETECTED!</h1>
    <!-- <h1>{{ printPicklist() }}</h1> -->
    <ul class="button-holder">
        <li v-for="index in size">
            <button @click="(_) => update(index)" :class="{'selected' : checkPress(index), 'pick-button' : true}">{{index}}</button>
        </li>
    </ul>
</template>