<script>
import Slot from "../components/Slots/Slot.vue";
import SlotButton from "../components/Slots/SlotButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";

export default {
    data() {
        return {
            amountWon: 0,
            slotSpinTimes: 10,
            slotAmount: 3,
            spinning: false,
            slotBets: [5000, 10000, 20000],
            goodSlotValues: ["$", "7"],
            lastPlacedBet: 0,
            lastReward: 0
        };
    },
    components: { Slot, SlotButton, BetSelectButton },
    methods: {
        spinSlots(slotCounter, rewards=[]) {
            if(slotCounter == 1) {
                if(this.spinning) return;
                this.lastPlacedBet = Number(this.$refs.betSelect.$data.value);
                this.$emit("changePoints", -Number(this.$refs.betSelect.$data.value));
            }
            else if (slotCounter > this.slotAmount) {
                this.spinning = false;
                this.calculateReward(rewards);
                return;
            }

            this.spinning = true;
            this.$refs['slot' + slotCounter][0].spin(this.slotSpinTimes).then(res => {
                rewards.push(res);
                this.spinSlots(slotCounter + 1, rewards);
            });


        },
        calculateReward(rewards) {
            const setRewards = new Set(rewards);
            let finalReward = 0;
            if(setRewards.size === 1 && setRewards.has(...this.goodSlotValues)) finalReward = this.lastPlacedBet*2;

            this.lastReward = finalReward;
            this.broadcastRewards(finalReward);
        },
        broadcastRewards(rewards) {
            this.$emit("changePoints", rewards);
        }
    }
}
</script>

<template>
    <main>
        <p id="lastReward">Last reward: {{ lastReward }}</p>
        <div id="slotSpace">
            <Slot v-for="i in slotAmount" :ref="String('slot' + i)" class="slot"></Slot>
        </div>
        <div id="options">
            <BetSelectButton :bets="slotBets" id="betSelect" ref="betSelect"></BetSelectButton>
            <SlotButton @click="spinSlots(1)">Spin</SlotButton>
        </div>
        
    </main>
</template>

<style scoped>
main {
    text-align: center;
}

#lastReward {
    margin-top: 1%;
    color: aquamarine;
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

#options {
    margin-top: 10%;
    position: relative;
}

BetSelectButton {
    position: absolute;
}

#betSelect {
    display: flex;
    margin-left: 5%;
}
</style>