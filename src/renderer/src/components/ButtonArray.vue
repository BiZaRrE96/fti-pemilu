<script setup lang="ts">
    import { inject } from 'vue';
    
    // Identifies what "id" or position this button array belonds to
    // cid = calon id
    const props = defineProps<{
        cid?: number;
    }>();

    // Get the picklist from first parent.
    // Since we injected a reactive, a change here should trigger changes in other components
    // specifically ones that use the very same pickList
    // I think im missusing typescript here and shouldve typed it as Reactive<Number[]>
    var pickList : number[] | undefined = inject("pickList");

    // How many calons are there, ergo how many buttons the array should have
    const size = pickList ? pickList.length : 0

    // Considered abnormal if the button array does not have a size OR it is not supplied with cid OR when cid is larger than size
    // For reference cid starts at 1
    const abnormality = !size || (props.cid ? ((props.cid <= size) ? false : true) : true)

    function checkPress(order : number) : boolean {
        if (pickList && props.cid) {
            if (pickList[props.cid-1] === order) {
                return true
            }
        }
        return false
    }

    // Order is the "number on the button"
    function update(order : number) {
        if (pickList && props.cid) {

            // If previously another calon was picked in this order, set their order to 0
            // This returns -1 if it doesnt exist, else
            const existingIndex : number = pickList.indexOf(order)
            if (existingIndex != -1) { // If the selected number/order was previously selected
                pickList[existingIndex] = 0; // Set their "pick priority" to 0, effectively deselecting
                if (existingIndex === props.cid-1) { // If it happens to be "This" calon i.e. pressing the same button twice
                    console.log("RELEASING",props.cid)
                    return; //No need to go downwards as its just releasing selection
                }    
            }
            //console.log("EXISTING INDEX",existingIndex)
            pickList[props.cid-1] = order; //Set this calon to the selected order
        } else {
        }
        console.log("Calon number",(props.cid ? props.cid : -1),"is now picked as",order)
    }

    /* used to return a string that represents the active picklist 
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
    } */
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