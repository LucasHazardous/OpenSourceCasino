<script>
import PlayButton from "../components/PlayButton.vue";
import BetSelectButton from "../components/BetSelectButton.vue";
import BlackjackCardTable from "../components/BlackjackCardTable.vue";
import InfoSection from "../components/InfoSection.vue";

export default {
    props: ["points"],
    data() {
        return {
            playing: false,
            selectedBet: 0,
            lastReward: 0,
            blackjackBets: [25000, 50000],
            deckCards: ['♠ 10', '♥ 10', '♦ 10', '♣ 10', '♠ 2',
                '♥ 2', '♦ 2', '♣ 2', '♠ 3', '♥ 3', '♦ 3',
                '♣ 3', '♠ 4', '♥ 4', '♦ 4', '♣ 4', '♠ 5',
                '♥ 5', '♦ 5', '♣ 5', '♠ 6', '♥ 6', '♦ 6',
                '♣ 6', '♠ 7', '♥ 7', '♦ 7', '♣ 7', '♠ 8',
                '♥ 8', '♦ 8', '♣ 8', '♠ 9', '♥ 9', '♦ 9',
                '♣ 9', '♠ A', '♥ A', '♦ A', '♣ A', '♠ J',
                '♥ J', '♦ J', '♣ J', '♠ Q', '♥ Q', '♦ Q',
                '♣ Q', '♠ K', '♥ K', '♦ K', '♣ K'
            ],
            dealerCards: [],
            playerCards: [],
            discardedCards: [],
            dealerHide: true,
            playerHandValue: 0,
            cardsInPlay: [],
            enableButtons: true,
            dealerHandValue: -1,
            continueButtonEnabled: false
        };
    },
    components: { PlayButton, BetSelectButton, BlackjackCardTable, InfoSection },
    methods: {
        startGame() {
            this.selectedBet = Number(this.$refs.betSelect.$data.value);

            if (this.points - this.selectedBet < 0) return;

            this.$emit("changePoints", -this.selectedBet);
            this.playing = true;

            this.giveDealerCards();
            this.givePlayerCards();
        },
        hit() {
            if (this.playerHandValue > 20) return;

            this.playerCards.push(this.fetchCard());

            this.playerHandValue = this.calculateHandValue(this.playerCards);
        },
        stand() {
            this.dealerHide = false;
            while(this.calculateHandValue(this.dealerCards) < 17) this.dealerCards.push(this.fetchCard());

            const dealerHandValue = this.calculateHandValue(this.dealerCards);
            this.dealerHandValue = dealerHandValue;

            let lastReward = this.selectedBet;
            if(this.playerHandValue > 21 && dealerHandValue > 21);
            else if(this.playerHandValue > 21) lastReward -= this.selectedBet;
            else if(dealerHandValue > 21) lastReward += this.selectedBet;
            else if(this.playerHandValue > dealerHandValue) lastReward += this.selectedBet;
            else if(dealerHandValue > this.playerHandValue) lastReward -= this.selectedBet;

            this.$emit("changePoints", lastReward);
            this.lastReward = lastReward;

            this.enableButtons = false;
            this.continueButtonEnabled = true;
        },
        startNewRound() {
            if (this.points - this.selectedBet < 0) return;

            this.$emit("changePoints", -this.selectedBet);

            this.continueButtonEnabled = false;
            this.dealerHandValue = -1;
            this.clearBothHands();
            this.discardedCards = this.discardedCards.concat(this.cardsInPlay);
            this.cardsInPlay = [];
            this.giveDealerCards();
            this.givePlayerCards();
            this.enableButtons = true;
        },
        calculateHandValue(arr) {
            let aceCount = 0;
            let value = 0;
            for(let i = 0; i < arr.length; i++) {
                const cardValue = arr[i].slice(2, 4);

                if(cardValue == "A") aceCount++;
                else if(!isNaN(cardValue)) value += Number(cardValue);
                else value += 10;
            }

            value += aceCount;
            if(value <= 11 && aceCount > 0) value += 10;
            return value;
        },
        givePlayerCards() {
            this.playerCards.push(this.fetchCard());
            this.playerCards.push(this.fetchCard());

            this.playerHandValue = this.calculateHandValue(this.playerCards);
        },
        giveDealerCards() {
            this.dealerHide = true;
            this.dealerCards.push(this.fetchCard());
            this.dealerCards.push(this.fetchCard());
        },
        clearBothHands() {
            this.playerCards = [];
            this.dealerCards = [];
            this.playerHandValue = 0;
        },
        fetchCard() {
            if(this.deckCards.length == 0) {
                alert("Shuffling discarded cards back to the deck.");
                this.shuffleDiscardToDeck();
            }

            let selectedCard = this.deckCards.splice(Math.floor(Math.random() * this.deckCards.length), 1)[0];
            
            this.cardsInPlay.push(selectedCard);
            return selectedCard;
        },
        shuffleDiscardToDeck() {
            this.deckCards = this.discardedCards;
            this.discardedCards = [];
            
            for(let i = this.deckCards.length-1; i > 0; i--) {
                const r = Math.floor(Math.random() * (i+1));
                const tmp = this.deckCards[i];
                this.deckCards[i] = this.deckCards[r];
                this.deckCards[r] = tmp;
            }
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
            <h1>{{ dealerHandValue < 0 ? "?" : dealerHandValue }}</h1>
            <BlackjackCardTable :dealerHide="dealerHide" :cards="dealerCards"></BlackjackCardTable>
            <BlackjackCardTable :dealerHide="false" :cards="playerCards"></BlackjackCardTable>
            <h1>{{ playerHandValue }}</h1>

            <div id="options">
                <PlayButton v-if="enableButtons" @click="hit">Hit</PlayButton>
                <PlayButton v-if="enableButtons" @click="stand">Stand</PlayButton>
                <PlayButton v-if="continueButtonEnabled" @click="startNewRound">Next Round</PlayButton>
            </div>
        </div>

        <InfoSection>
            <table>
                <tr>
                    <th>Event</th>
                    <th>Reward</th>
                </tr>
                <tr>
                    <td>Round start</td>
                    <td>-original bet</td>
                </tr>
                <tr>
                    <td>Tie</td>
                    <td>original bet</td>
                </tr>
                <tr>
                    <td>Failure</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Victory</td>
                    <td>selected bet x2</td>
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
    margin-top: 5%;
    margin-bottom: 2%;
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

h1 {
    color: aquamarine;
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
