<script>
import Slot from "../components/Slot.vue";

export default {
    data() {
        return {
            amountWon: 0,
            slotSpinTimes: 10,
            slotAmount: 3,
            spinning: false
        };
    },
    components: { Slot },
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
        <button class="spinButton" @click="spinSlots(1)">
            <span class="spinButtonInside">
                Spin
            </span>
        </button>
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

.spinButton {
    margin-top: 10%;
    background: hsl(340deg 100% 32%);
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
}

.spinButtonInside {
    display: block;
    padding: 10% 3.5rem;
    border-radius: 1rem;
    font-size: 140%;
    background: #f00068;
    color: azure;
    transform: translateY(-6px);
}

.spinButton:active .spinButtonInside:active {
    transform: translateY(-2px);
}
</style>