<script>
import BetSelectButton from "../components/BetSelectButton.vue";
import Roulette from "../components/RouletteComponent.vue";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  props: ["points"],
  data() {
    return {
      rouletteBets: [100000, 200000],
      autospinning: false,
      lastReward: 0,
      spinning: false,
      colors: ["dark-blue", "light-blue"],
      buttonSound: new Audio("spin.mp3"),
      end: false,
    };
  },
  components: {
    BetSelectButton,
    Roulette,
    ToastNotification,
  },
  methods: {
    spinRoulette() {
      if (this.spinning) return;

      const placedBet = this.$refs.betSelect.$data.value;

      if (this.$props.points - placedBet < 0) {
        this.autospinning = false;
        return;
      }

      this.spinning = true;

      this.$emit("changePoints", -placedBet);
      this.buttonSound.play();

      const chosenColor = this.$refs.colorSelect.$data.value;

      this.$refs.roulette.spin().then((res) => {
        this.end = true;
        if (res === chosenColor) {
          this.$emit("changePoints", placedBet * 1.5);
          this.lastReward = placedBet * 1.5;
        } else this.lastReward = 0;
        this.spinning = false;
        setTimeout(() => {
          this.end = false;
        }, 3000);
      });
    },
  },
  watch: {
    autospinning: function autospinWatch() {
      if (!this.spinning && this.autospinning) this.spinRoulette();
    },
    spinning: function spinWatch() {
      if (!this.spinning && this.autospinning)
        setTimeout(this.spinRoulette, 1000);
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
        <h2 class="text-[2em]">Roulette</h2>
        <p id="lastReward" class="font-mono">Last reward: {{ lastReward }}</p>
      </div>
      <Roulette class="!m-0 p-5" ref="roulette"></Roulette>
      <div
        id="options"
        class="flex flex-col items-center justify-center sm:flex-row gap-5 transition-all"
      >
        <BetSelectButton
          :bets="rouletteBets"
          :disabled="spinning || autospinning"
          id="betSelect"
          ref="betSelect"
        ></BetSelectButton>

        <div class="btn-group btn-group-horizontal">
          <button
            class="btn btn-primary transition-all"
            @click="spinRoulette()"
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

        <BetSelectButton
          title="Choose color"
          :bets="colors"
          :disabled="spinning || autospinning"
          id="colorSelect"
          ref="colorSelect"
        ></BetSelectButton>
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
              <div class="stat-title">Light-blue</div>
              <div class="stat-value">50%</div>
              <div class="stat-desc">Reward: Original bet x 1.5</div>
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
              <div class="stat-title">Dark-blue</div>
              <div class="stat-value">50%</div>
              <div class="stat-desc">Reward: Original bet x 1.5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
