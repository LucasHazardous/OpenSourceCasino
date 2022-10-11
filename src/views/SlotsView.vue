<script>
import Slot from "../components/Slot.vue";
import SlotButton from "../components/SlotButton.vue";

export default {
    data() {
        return {
            amountWon: 0,
            slotSpinTimes: 10,
            slotAmount: 3,
            spinning: false
        };
    },
    components: { Slot, SlotButton },
    methods: {
        spinSlots(slotCounter) {
            if(slotCounter == 1 && this.spinning) return;
            if (slotCounter > this.slotAmount) {
                this.spinning = false;
                return;
            }
            this.spinning = true;
            this.$refs['slot' + slotCounter][0].spin(this.slotSpinTimes).then(res => this.spinSlots(slotCounter + 1));
        }
    }
}
</script>

<template>
    <main>
        <div id="slotSpace">
            <Slot v-for="i in slotAmount" :ref="String('slot' + i)" class="slot"></Slot>
        </div>
        <SlotButton @click="spinSlots(1)">Slot</SlotButton>
    </main>
</template>

<style scoped>
main {
    text-align: center;
}

#slotSpace {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.slot {
    display: inline-block;
    padding: 10%;
    margin: 1%;
}
</style>