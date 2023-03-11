import { mount } from "@vue/test-utils";
import SlotComponent from "../../src/components/SlotComponent.vue";

test("mount component and spin", async () => {
  const slotValues = ["1", "2", "3"];

  expect(SlotComponent).toBeTruthy();

  const wrapper = mount(SlotComponent, {
    props: {
      slotValues,
    },
  });

  expect(wrapper.getCurrentComponent().props.slotValues.length).toBe(
    slotValues.length
  );

  expect(slotValues).include(await wrapper.vm.spin(3));
});
