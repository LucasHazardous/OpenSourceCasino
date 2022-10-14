<script>
import PlayButton from "../components/PlayButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import AutospinButton from "../components/AutospinButton.vue";
import Roulette from "../components/Roulette.vue";

export default {
    props: ["points"],
    data() {
        return {
            rouletteBets: [5000, 10000, 20000],
            autospinning: false,
            lastReward: 0
        };
    },
    components: { PlayButton, BetSelectButton, AutospinButton, Roulette },
    methods: {
        spinRoulette() {
            this.$refs.roulette.spin();
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
            <PlayButton @click="spinRoulette">Spin</PlayButton>
            <AutospinButton :autospinning="autospinning" id="autospinButton">
                Autospin</AutospinButton>
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
</style>