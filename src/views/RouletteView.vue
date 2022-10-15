<script>
import PlayButton from "../components/PlayButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import AutospinButton from "../components/AutospinButton.vue";
import Roulette from "../components/Roulette.vue";

export default {
    props: ["points"],
    data() {
        return {
            rouletteBets: [100000, 200000],
            autospinning: false,
            lastReward: 0,
            spinning: false,
            colors: ["red", "black"]
        };
    },
    components: { PlayButton, BetSelectButton, AutospinButton, Roulette },
    methods: {
        spinRoulette() {
            if (this.spinning) return;

            this.spinning = true;

            const placedBet = this.$refs.betSelect.$data.value;
            this.$emit("changePoints", -placedBet);

            const chosenColor = this.$refs.colorSelect.$data.value;

            this.$refs.roulette.spin().then(res => {
                if (res == chosenColor) {
                    this.$emit("changePoints", placedBet * 2);
                    this.lastReward = placedBet * 2;
                } else this.lastReward = 0;
                this.spinning = false;
            });
        }
    },
    watch: {
        autospinning: function autospinWatch() {
            if (!this.spinning && this.autospinning) this.spinRoulette();
        },
        spinning: function spinWatch() {
            if (!this.spinning && this.autospinning) setTimeout(this.spinRoulette, 1000);
        }
    }
}
</script>

<template>
    <main>
        <p id="lastReward">Last reward: {{ lastReward }}</p>
        <Roulette ref="roulette"></Roulette>
        <div id="options">
            <BetSelectButton :bets="rouletteBets" id="betSelect" ref="betSelect"></BetSelectButton>

            <PlayButton
                :style="spinning || autospinning ? 'pointer-events: none; opacity: 0.2' : 'pointer-events: auto'"
                @click="spinRoulette">Spin</PlayButton>
            <AutospinButton @click="autospinning = !autospinning" :autospinning="autospinning" id="autospinButton">
                Autospin</AutospinButton>
        </div>
        <BetSelectButton
            :style="spinning || autospinning ? 'pointer-events: none; opacity: 0.2' : 'pointer-events: auto'"
            :bets="colors" id="colorSelect" ref="colorSelect"></BetSelectButton>
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

#colorSelect {
    margin-top: 5%;
}

#betSelect {
    display: flex;
    margin-left: 5%;
    width: 100%;
    cursor: pointer;
}
</style>