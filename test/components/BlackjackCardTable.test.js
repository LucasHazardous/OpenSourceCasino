import { mount } from "@vue/test-utils";
import BlackjackCardTable from "../../src/components/BlackjackCardTable.vue";

const cards = ["♠ 5", "♥ 9", "♣ 10"];

test("mount component without dealer hide", async () => {
  expect(BlackjackCardTable).toBeTruthy();

  const wrapper = mount(BlackjackCardTable, {
    props: {
      cards,
      dealerHide: false,
    },
  });

  expect(wrapper.get("div").element.children.length).toBe(cards.length);
});

test("mount component with dealer hide", async () => {
  expect(BlackjackCardTable).toBeTruthy();

  const wrapper = mount(BlackjackCardTable, {
    props: {
      cards,
      dealerHide: true,
    },
  });

  expect(wrapper.get("div").element.children.length).toBe(2);
});
