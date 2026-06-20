import { calculateCarbon } from "../src/lib/calculator";
test("carbon calculation works", () => {
  expect(calculateCarbon(100)).toBeGreaterThan(0);
});