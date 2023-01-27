<script>
import BetSelectButton from "../components/BetSelectButton.vue";
import Roulette from "../components/RouletteComponent.vue";
import ToastNotification from "../components/ToastNotification.vue";
import InfoComponent from "../components/InfoComponent.vue";

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
    InfoComponent,
  },
  methods: {
    spinRoulette() {
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

      <InfoComponent
        :elements="[
          {
            title: 'Light-blue',
            value: '50%',
            desc: 'Reward: Original bet x 1.5',
          },
          {
            title: 'Dark-blue',
            value: '50%',
            desc: 'Reward: Original bet x 1.5',
          },
        ]"
      ></InfoComponent>
    </div>
  </main>
</template>
