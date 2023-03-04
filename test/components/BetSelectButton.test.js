import { mount } from "@vue/test-utils";
import { expect } from "chai";
import BetSelectButton from "../../src/components/BetSelectButton.vue";

test("mount component", async () => {
  const bets = [100, 2000, 5000];

  expect(BetSelectButton).toBeTruthy();

  const wrapper = mount(BetSelectButton, {
    props: {
      bets,
    },
  });

  const options = wrapper.findAll("option");

  expect(options.length).toBe(bets.length);

  for (let i = 0; i < options.length; i++) {
    expect(Number(options[i].text())).toBe(bets[i]);
  }
});
