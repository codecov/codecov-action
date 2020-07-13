import Index from "./index";

test('test uncovered if', () => {
  const indexObj = new Index();
  expect(indexObj.uncovered_if()).toEqual(false);
});

test('fully covered', () => {
  const indexObj = new Index();
  expect(indexObj.fully_covered()).toEqual(true);
});
