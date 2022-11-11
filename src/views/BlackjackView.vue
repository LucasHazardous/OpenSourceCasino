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
      deckCards: [
        "♠ 10",
        "♥ 10",
        "♦ 10",
        "♣ 10",
        "♠ 2",
        "♥ 2",
        "♦ 2",
        "♣ 2",
        "♠ 3",
        "♥ 3",
        "♦ 3",
        "♣ 3",
        "♠ 4",
        "♥ 4",
        "♦ 4",
        "♣ 4",
        "♠ 5",
        "♥ 5",
        "♦ 5",
        "♣ 5",
        "♠ 6",
        "♥ 6",
        "♦ 6",
        "♣ 6",
        "♠ 7",
        "♥ 7",
        "♦ 7",
        "♣ 7",
        "♠ 8",
        "♥ 8",
        "♦ 8",
        "♣ 8",
        "♠ 9",
        "♥ 9",
        "♦ 9",
        "♣ 9",
        "♠ A",
        "♥ A",
        "♦ A",
        "♣ A",
        "♠ J",
        "♥ J",
        "♦ J",
        "♣ J",
        "♠ Q",
        "♥ Q",
        "♦ Q",
        "♣ Q",
        "♠ K",
        "♥ K",
        "♦ K",
        "♣ K",
      ],
      dealerCards: [],
      playerCards: [],
      discardedCards: [],
      dealerHide: true,
      playerHandValue: 0,
      cardsInPlay: [],
      enableButtons: false,
      dealerHandValue: -1,
      continueButtonEnabled: false,
    };
  },
  components: { PlayButton, BetSelectButton, BlackjackCardTable, InfoSection },
  methods: {
    startGame() {
      this.selectedBet = Number(this.$refs.betSelect.$data.value);
      this.enableButtons = true;
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
      while (this.calculateHandValue(this.dealerCards) < 17)
        this.dealerCards.push(this.fetchCard());

      const dealerHandValue = this.calculateHandValue(this.dealerCards);
      this.dealerHandValue = dealerHandValue;

      let lastReward = this.selectedBet;
      if (this.playerHandValue > 21 && dealerHandValue > 21);
      else if (this.playerHandValue > 21) lastReward -= this.selectedBet;
      else if (dealerHandValue > 21) lastReward += this.selectedBet;
      else if (this.playerHandValue > dealerHandValue)
        lastReward += this.selectedBet;
      else if (dealerHandValue > this.playerHandValue)
        lastReward -= this.selectedBet;

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
      for (let i = 0; i < arr.length; i++) {
        const cardValue = arr[i].slice(2, 4);

        if (cardValue == "A") aceCount++;
        else if (!isNaN(cardValue)) value += Number(cardValue);
        else value += 10;
      }

      value += aceCount;
      if (value <= 11 && aceCount > 0) value += 10;
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
      if (this.deckCards.length == 0) {
        alert("Shuffling discarded cards back to the deck.");
        this.shuffleDiscardToDeck();
      }

      let selectedCard = this.deckCards.splice(
        Math.floor(Math.random() * this.deckCards.length),
        1
      )[0];

      this.cardsInPlay.push(selectedCard);
      return selectedCard;
    },
    shuffleDiscardToDeck() {
      this.deckCards = this.discardedCards;
      this.discardedCards = [];

      for (let i = this.deckCards.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = this.deckCards[i];
        this.deckCards[i] = this.deckCards[r];
        this.deckCards[r] = tmp;
      }
    },
  },
};
</script>

<template>
  <main
    class="flex flex-col min-h-screen sm:h-screen w-screen justify-center items-center transition-all"
  >
    <div
      class="flex flex-col sm:flex-row gap-5 w-full sm:w-2/3 h-auto sm:h-1/2 justify-center transition-transform"
    >
      <div class="flex flex-col sm:w-1/3 justify-center items-center gap-5">
        <div class="flex flex-col items-center">
          <h2 class="text-[2em]">Blackjack</h2>
          <p id="lastReward" class="font-mono">Last reward: {{ lastReward }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-5 transition-all">
          <BetSelectButton
            :class="playing ? 'select-disabled' : 'select-active'"
            :bets="blackjackBets"
            id="betSelect"
            ref="betSelect"
          />
          <button
            class="btn btn-primary transition-all"
            @click="startGame"
            ref="spinButton"
            :disabled="playing"
          >
            Play
          </button>
        </div>
        <div class="flex flex-col sm:flex-row gap-5 transition-all">
          <div v-if="enableButtons" class="btn-group btn-group-horizontal">
            <button class="btn" @click="hit" ref="spinButton">Hit</button>
            <button class="btn" @click="stand" id="autospinButton">
              Stand
            </button>
          </div>
          <button
            v-if="continueButtonEnabled"
            class="btn btn-primary transition-all"
            @click="startNewRound"
            ref="spinButton"
          >
            Next Round
          </button>
        </div>
      </div>
      <div
        id="game"
        class="flex flex-col items-center w-full sm:w-1/2 gap-3"
        v-if="playing"
      >
        <h1>{{ dealerHandValue < 0 ? "?" : dealerHandValue }}</h1>
        <BlackjackCardTable
          :dealerHide="dealerHide"
          :cards="dealerCards"
        ></BlackjackCardTable>
        <BlackjackCardTable
          :dealerHide="false"
          :cards="playerCards"
        ></BlackjackCardTable>
        <h1>{{ playerHandValue }}</h1>
      </div>
    </div>
    <div tabindex="0" class="collapse rounded-box">
      <div class="collapse-title text-2xl font-medium text-center p-5">
        Gain per event
      </div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Event</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
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
                <td>original bet x2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
