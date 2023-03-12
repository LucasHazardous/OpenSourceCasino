<script>
import BetSelectButton from "../components/BetSelectButton.vue";
import BlackjackCardTable from "../components/BlackjackCardTable.vue";
import ToastNotification from "../components/ToastNotification.vue";

export default {
  props: ["points"],
  data() {
    return {
      playing: false,
      selectedBet: 25000,
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
      action: false,
      shuffle: false,
    };
  },
  components: {
    ToastNotification,
    BetSelectButton,
    BlackjackCardTable,
  },
  methods: {
    startGame() {
      this.selectedBet = Number(this.$refs.betSelect.$data.value);
      if (this.points - this.selectedBet < 0) return;
      this.enableButtons = true;

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

      this.action = true;
      this.$emit("changePoints", lastReward);
      this.lastReward = lastReward;

      this.enableButtons = false;
      this.continueButtonEnabled = true;
      setTimeout(() => {
        if (!this.shuffle) this.action = false;
      }, 1000);
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

        if (cardValue === "A") aceCount++;
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
      if (this.deckCards.length === 0) {
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
      this.shuffle = true;
      this.action = true;
      for (let i = this.deckCards.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = this.deckCards[i];
        this.deckCards[i] = this.deckCards[r];
        this.deckCards[r] = tmp;
      }
      setTimeout(() => {
        this.shuffle = false;
        this.action = false;
      }, 3000);
    },
  },
};
</script>

<template>
  <main
    class="flex flex-col min-h-screen sm:h-screen w-screen justify-center items-center transition-all"
  >
    <ToastNotification
      :shuffle="shuffle"
      :message="'You earned ' + lastReward + ' points!'"
      class="transition-all"
      :class="action ? 'translate-x-0' : 'translate-x-96'"
    />
    <div
      class="flex flex-col sm:flex-row gap-5 w-full sm:w-2/3 h-auto justify-center transition-transform"
    >
      <div
        class="flex flex-row flex-wrap sm:flex-col sm:w-1/3 justify-center items-center gap-5"
      >
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
            :disabled="playing"
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
        class="flex flex-col items-center w-full px-5 sm:w-5/12 gap-3"
        v-if="playing"
      >
        <h1>{{ dealerHandValue < 0 ? "?" : dealerHandValue }}</h1>
        <BlackjackCardTable
          :dealerHide="dealerHide"
          :cards="dealerCards"
        ></BlackjackCardTable>
        <div class="divider"></div>
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
                <td>-Original bet</td>
              </tr>
              <tr>
                <td>Tie</td>
                <td>+Original bet</td>
              </tr>
              <tr>
                <td>Failure</td>
                <td>Nothing</td>
              </tr>
              <tr>
                <td>Victory</td>
                <td>+Original bet x 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
