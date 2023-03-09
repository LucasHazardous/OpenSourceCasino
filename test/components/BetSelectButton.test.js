import { mount } from "@vue/test-utils";
import BetSelectButton from "../../src/components/BetSelectButton.vue";

test("mount component and change value", async () => {
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

  await wrapper.get("select").setValue(bets[1]);

  expect(Number(wrapper.getCurrentComponent().data.value)).toBe(bets[1]);
});
