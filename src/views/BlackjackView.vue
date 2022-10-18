<script>
import PlayButton from "../components/PlayButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import BlackjackCardTable from "../components/BlackjackCardTable.vue";

export default {
    props: ["points"],
    data() {
        return {
            playing: false,
            selectedBet: 0,
            lastReward: 0,
            blackjackBets: [25000, 50000],
            deckCards: ['S 1', 'H 1', 'D 1', 'C 1', 'S 2',
                'H 2', 'D 2', 'C 2', 'S 3', 'H 3', 'D 3',
                'C 3', 'S 4', 'H 4', 'D 4', 'C 4', 'S 5',
                'H 5', 'D 5', 'C 5', 'S 6', 'H 6', 'D 6',
                'C 6', 'S 7', 'H 7', 'D 7', 'C 7', 'S 8',
                'H 8', 'D 8', 'C 8', 'S 9', 'H 9', 'D 9',
                'C 9', 'S A', 'H A', 'D A', 'C A', 'S J',
                'H J', 'D J', 'C J', 'S Q', 'H Q', 'D Q',
                'C Q', 'S K', 'H K', 'D K', 'C K'
            ],
            dealerCards: [],
            playerCards: [],
            discardedCards: []
        };
    },
    components: { PlayButton, BetSelectButton, BlackjackCardTable },
    methods: {
        startGame() {
            this.selectedBet = this.$refs.betSelect.$data.value;
            this.playing = true;
        },
        hit() {
            if (!this.canPerformAction()) return;

            const selectedCard = this.deckCards.splice(Math.floor(Math.random() * this.deckCards.length), 1)[0];
            this.playerCards.push(selectedCard);
            this.discardedCards.push(selectedCard);
        },
        stand() {

        },
        canPerformAction() {
            return this.points - this.selectedBet >= 0;
        },
        calculateHandValue(arr) {
            let aceCount = 0;
            let value = 0;
            for(let i = 0; i < arr.length; i++) {
                const cardValue = arr[i][2];

                if(cardValue == "A") aceCount++;
                else if(!isNaN(cardValue)) value += Number(cardValue);
                else value += 10;
            }

            value += aceCount;
            if(value <= 11 && aceCount > 0) value += 10;
            return value;
        }
    }
}
</script>

<template>
    <main>
        <p id="lastReward">Last reward: {{ lastReward }}</p>
        <div id="options" v-if="!playing">
            <BetSelectButton :bets="blackjackBets" id="betSelect" ref="betSelect"></BetSelectButton>

            <PlayButton @click="startGame">Play</PlayButton>
        </div>

        <div id="game" v-if="playing">
            <BlackjackCardTable :cards="dealerCards"></BlackjackCardTable>
            <BlackjackCardTable :cards="playerCards"></BlackjackCardTable>

            <div id="options">
                <PlayButton @click="hit">Hit</PlayButton>
                <PlayButton @click="stand">Stand</PlayButton>
            </div>
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
    grid-template-columns: repeat(2, 1fr);
    margin: 2%;
}

#betSelect {
    display: flex;
    width: 100%;
    cursor: pointer;
}
</style>