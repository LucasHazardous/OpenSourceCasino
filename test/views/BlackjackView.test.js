import { mount } from "@vue/test-utils";
import BlackjackView from "../../src/views/BlackjackView.vue";

const selectedBet = 50000;

describe("mount component, start game with selected value", async () => {
  expect(BlackjackView).toBeTruthy();

  const wrapper = mount(BlackjackView, {
    props: {
      points: selectedBet * 2,
    },
  });

  test("start game wtih selected bet", async () => {
    await wrapper.find("#betSelect").setValue(selectedBet);

    await wrapper.vm.startGame();

    expect(wrapper.emitted().changePoints[0][0]).toBe(-selectedBet);
  });

  test("hit if possible then stand", async () => {
    if (wrapper.vm.playerHandValue < 20) {
      wrapper.vm.hit();
    }

    wrapper.vm.stand();

    expect([selectedBet * 2, 0]).include(wrapper.emitted().changePoints[1][0]);
  });

  test("start new round and shuffle discarded from previous test", async () => {
    wrapper.vm.startNewRound();

    expect(wrapper.emitted().changePoints[2][0]).toBe(-selectedBet);

    const discardedCardsBeforeShuffle = wrapper.vm.discardedCards.length;

    expect(discardedCardsBeforeShuffle).toBeGreaterThanOrEqual(4);

    wrapper.vm.shuffleDiscardToDeck();

    expect(wrapper.vm.discardedCards.length).toBe(0);
    expect(wrapper.vm.deckCards.length).toBe(discardedCardsBeforeShuffle);
  });
});
