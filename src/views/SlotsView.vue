<script>
import SlotComponent from "../components/SlotComponent.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import ToastNotification from "@/components/ToastNotification.vue";

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
      buttonSound: new Audio("spin.mp3"),
      end: false,
    };
  },
  components: {
    ToastNotification,
    SlotComponent,
    BetSelectButton,
  },
  methods: {
    spinSlots(slotCounter, rewards = []) {
      if (slotCounter === 1) {
        if (this.spinning) return;

        this.lastPlacedBet = Number(this.$refs.betSelect.$data.value);
        if (this.$props.points - this.lastPlacedBet < 0) {
          this.autospinning = false;
          return;
        }
        this.$emit("changePoints", -this.lastPlacedBet);
        this.buttonSound.play();
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

      this.end = true;
      this.lastReward = finalReward;
      this.$emit("changePoints", finalReward);
      setTimeout(() => {
        this.end = false;
      }, 3000);
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
  <main
    class="flex min-h-screen w-screen justify-center items-center transition-all"
  >
    <ToastNotification
      :message="'You earned ' + lastReward + ' points!'"
      class="transition-all"
      :class="end ? 'translate-x-0' : 'translate-x-96'"
    />
    <div class="flex flex-col w-5/6 sm:w-2/3 items-center gap-5">
      <div class="flex flex-col items-center">
        <h2 class="text-[2em]">Slots</h2>
        <p id="lastReward" class="font-mono">Last reward: {{ lastReward }}</p>
      </div>
      <div id="slotSpace" class="pt-3 flex justify-center gap-5 w-full">
        <SlotComponent
          :key="i"
          v-for="i in slotAmount"
          :slotValues="slotValues"
          :ref="String('slot' + i)"
          class="slot"
        />
      </div>
      <div
        id="options"
        class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 trans"
      >
        <BetSelectButton
          :bets="slotBets"
          :disabled="spinning || autospinning"
          id="betSelect"
          ref="betSelect"
        ></BetSelectButton>

        <div class="btn-group btn-group-horizontal">
          <button
            class="btn btn-primary transition-all w-1/2"
            @click="spinSlots(1)"
            ref="spinButton"
            :disabled="spinning || autospinning"
          >
            {{ spinning || autospinning ? "Spinning..." : "Spin" }}
          </button>
          <button
            class="btn"
            @click="autospinning = !autospinning"
            id="autospinButton"
          >
            {{ autospinning ? "Stop" : "Autospin" }}
          </button>
        </div>
      </div>
      <div tabindex="0" class="collapse rounded-box">
        <div class="collapse-title text-2xl font-medium text-center p-5">
          Loot chances
        </div>
        <div class="collapse-content">
          <div class="stats stats-vertical lg:stats-horizontal shadow">
            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current stroke-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">$$$</div>
              <div class="stat-value">
                {{
                  (
                    (1 / Math.pow(this.slotValues.length, this.slotAmount)) *
                    100
                  ).toFixed(2)
                }}%
              </div>
              <div class="stat-desc">Reward: Original bet x 5</div>
            </div>
            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current stroke-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">777</div>
              <div class="stat-value">
                {{
                  (
                    (1 / Math.pow(this.slotValues.length, this.slotAmount)) *
                    100
                  ).toFixed(2)
                }}%
              </div>
              <div class="stat-desc">Reward: Original bet x 7</div>
            </div>
            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current stroke-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">==</div>
              <div class="stat-value">
                {{
                  (
                    (1 -
                      (Math.pow(this.slotValues.length - 1, this.slotAmount) +
                        Math.pow(
                          this.slotValues.length - 1,
                          this.slotAmount - 1
                        ) *
                          this.slotAmount) /
                        Math.pow(this.slotValues.length, this.slotAmount)) *
                    100
                  ).toFixed(2)
                }}%
              </div>
              <div class="stat-desc">Reward: Original bet x 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
