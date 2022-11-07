<script>
import Slot from "../components/Slot.vue";
import PlayButton from "../components/PlayButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import InfoSection from "../components/InfoSection.vue";
import AutospinButton from "../components/AutospinButton.vue";

export default {
  props: ["points"],
  data() {
    return {
      slotSpinTimes: 10,
      slotAmount: 3,
      spinning: false,
      slotBets: [5000, 10000, 20000],
      slotValues: ["$", "0", "7", "-", "="],
      lastPlacedBet: 0,
      lastReward: 0,
      autospinning: false,
    };
  },
  components: {
    Slot,
    PlayButton,
    BetSelectButton,
    InfoSection,
    AutospinButton,
  },
  methods: {
    spinSlots(slotCounter, rewards = []) {
      if (slotCounter == 1) {
        if (this.spinning) return;

        this.lastPlacedBet = Number(this.$refs.betSelect.$data.value);
        if (this.$props.points - this.lastPlacedBet < 0) {
          this.autospinning = false;
          return;
        }
        this.$emit("changePoints", -this.lastPlacedBet);
      } else if (slotCounter > this.slotAmount) {
        this.spinning = false;
        this.calculateReward(rewards);
        return;
      }

      this.spinning = true;
      this.$refs["slot" + slotCounter][0]
        .spin(this.slotSpinTimes)
        .then((res) => {
          rewards.push(res);
          this.spinSlots(slotCounter + 1, rewards);
        });
    },
    calculateReward(rewards) {
      const rewardsMap = rewards.reduce(
        (map, reward) => map.set(reward, (map.get(reward) || 0) + 1),
        new Map()
      );
      let finalReward = 0;

      if (rewardsMap.get("$") === this.slotAmount)
        finalReward = this.lastPlacedBet * 5;
      else if (rewardsMap.get("7") === this.slotAmount)
        finalReward = this.lastPlacedBet * 7;
      else if (rewardsMap.get("=") >= 2) finalReward = this.lastPlacedBet * 2;

      this.lastReward = finalReward;
      this.$emit("changePoints", finalReward);
    },
  },
  watch: {
    autospinning: function autospinWatch() {
      if (!this.spinning && this.autospinning) this.spinSlots(1);
    },
    spinning: function spinWatch() {
      if (!this.spinning && this.autospinning)
        setTimeout(this.spinSlots, 500, 1);
    },
  },
};
</script>

<template>
  <main>
    <p id="lastReward">Last reward: {{ lastReward }}</p>
    <div id="slotSpace">
      <Slot
        v-for="i in slotAmount"
        :slotValues="slotValues"
        :ref="String('slot' + i)"
        class="slot"
      ></Slot>
    </div>
    <div id="options">
      <BetSelectButton
        :bets="slotBets"
        id="betSelect"
        ref="betSelect"
      ></BetSelectButton>
      <PlayButton
        :style="
          spinning || autospinning
            ? 'pointer-events: none; opacity: 0.2'
            : 'pointer-events: auto'
        "
        @click="spinSlots(1)"
        ref="spinButton"
        >Spin</PlayButton
      >
      <AutospinButton
        @click="autospinning = !autospinning"
        :autospinning="autospinning"
        id="autospinButton"
      >
        Autospin</AutospinButton
      >
    </div>

    <InfoSection>
      <h2>Loot table</h2>
      <table>
        <tr>
          <th>Result</th>
          <th>Theoretical Chance</th>
          <th>Reward</th>
        </tr>
        <tr>
          <td>$$$</td>
          <td>
            {{
              (
                (1 / Math.pow(this.slotValues.length, this.slotAmount)) *
                100
              ).toFixed(2)
            }}%
          </td>
          <td>original bet x 5</td>
        </tr>
        <tr>
          <td>777</td>
          <td>
            {{
              (
                (1 / Math.pow(this.slotValues.length, this.slotAmount)) *
                100
              ).toFixed(2)
            }}%
          </td>
          <td>original bet x 7</td>
        </tr>
        <tr>
          <td>at least two =</td>
          <td>
            {{
              (
                (1 -
                  (Math.pow(this.slotValues.length - 1, this.slotAmount) +
                    Math.pow(this.slotValues.length - 1, this.slotAmount - 1) *
                      this.slotAmount) /
                    Math.pow(this.slotValues.length, this.slotAmount)) *
                100
              ).toFixed(2)
            }}%
          </td>
          <td>original bet x 2</td>
        </tr>
      </table>
    </InfoSection>
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
  display: grid;
  column-gap: 10%;
  grid-template-columns: repeat(3, 1fr);
}

#autospinButton {
  margin-right: 5%;
}

#betSelect {
  display: flex;
  margin-left: 5%;
  width: 100%;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid black;
  text-align: left;
  padding: 0.5rem;
}

tr:nth-child(even) {
  background-color: azure;
}
</style>
