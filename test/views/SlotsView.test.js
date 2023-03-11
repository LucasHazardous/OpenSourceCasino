import { mount } from "@vue/test-utils";
import SlotsView from "../../src/views/SlotsView.vue";

const selectedBet = 10000;

describe("mount component, spin with selected value, calculate rewards", async () => {
  expect(SlotsView).toBeTruthy();

  const wrapper = mount(SlotsView, {
    props: {
      points: selectedBet,
    },
  });

  test("spin with selectedValue", async () => {
    await wrapper.find("#betSelect").setValue(selectedBet);

    await wrapper.vm.spinSlots(1);

    expect(wrapper.emitted().changePoints[0][0]).toBe(-selectedBet);
  });

  test("calculate rewards", async () => {
    await wrapper.vm.calculateReward(["7", "7", "7"]);
    expect(wrapper.emitted().changePoints[1][0]).toBe(selectedBet * 7);

    await wrapper.vm.calculateReward(["=", "7", "="]);
    expect(wrapper.emitted().changePoints[2][0]).toBe(selectedBet * 2);

    await wrapper.vm.calculateReward(["$", "$", "$"]);
    expect(wrapper.emitted().changePoints[3][0]).toBe(selectedBet * 5);
  });
});
