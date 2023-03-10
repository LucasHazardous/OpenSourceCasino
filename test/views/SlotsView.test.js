import { mount } from "@vue/test-utils";
import SlotsView from "../../src/views/SlotsView.vue";

const selectedBet = 10000;
const defaultBet = 5000;

test("mount component and spin with selected value", async () => {
  expect(SlotsView).toBeTruthy();

  const wrapper = mount(SlotsView, {
    props: {
      points: 10000,
    },
  });

  await wrapper.find("#betSelect").setValue(selectedBet);

  await wrapper.vm.spinSlots(1);

  expect(wrapper.emitted().changePoints[0][0]).toBe(-selectedBet);
});

test("mount component and test calculateReward", async () => {
  expect(SlotsView).toBeTruthy();

  const wrapper = mount(SlotsView, {
    props: {
      points: defaultBet,
    },
  });

  await wrapper.setData({
    lastPlacedBet: defaultBet,
  });

  await wrapper.vm.calculateReward(["7", "7", "7"]);
  expect(wrapper.emitted().changePoints[0][0]).toBe(defaultBet * 7);

  await wrapper.vm.calculateReward(["=", "7", "="]);
  expect(wrapper.emitted().changePoints[1][0]).toBe(defaultBet * 2);

  await wrapper.vm.calculateReward(["$", "$", "$"]);
  expect(wrapper.emitted().changePoints[2][0]).toBe(defaultBet * 5);
});
