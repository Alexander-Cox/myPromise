const myPromise = require("../my-promise");

jest.setTimeout(500);

describe("STATIC METHODS", () => {
  describe("myPromise.all", () => {
    it("should be a function", () => {
      expect(myPromise.all).toBeInstanceOf(Function);
    });
    it("should return a myPromise", () => {
      expect(myPromise.all([])).toBeInstanceOf(myPromise);
    });
    it("should pass the an empty array to the .then block if passed an empty array promises", () => {
      return myPromise.all([]).then((result) => {
        expect(result).toEqual([]);
      });
    });
    it("should pass on the result of a single promise via the passed array", () => {
      const fulfilledValue = { success: true };
      const successfulPromise = new myPromise((resolve) => {
        resolve(fulfilledValue);
      });
      return myPromise.all([successfulPromise]).then(([result]) => {
        expect(result).toBe(fulfilledValue);
      });
    });
    it("should wait until all promises are fulfilled in the array before fulfillment", () => {
      const fulfilledValueOne = { success: true };
      const fulfilledValueTwo = { successAgain: true };
      const successfulPromiseOne = new myPromise((resolve) => {
        resolve(fulfilledValueOne);
      });
      const successfulPromiseTwo = new myPromise((resolve) => {
        resolve(fulfilledValueTwo);
      });

      return myPromise
        .all([successfulPromiseOne, successfulPromiseTwo])
        .then((resultArray) => {
          expect(resultArray).toContain(fulfilledValueOne);
          expect(resultArray).toContain(fulfilledValueTwo);
        });
    });
    it("should return the results in order", () => {
      const fulfilledValueOne = { success: true };
      const fulfilledValueTwo = { successAgain: true };
      const fulfilledValueThree = { successYetAgain: true };
      const successfulPromiseOne = new myPromise((resolve) => {
        resolve(fulfilledValueOne);
      });
      const successfulPromiseTwo = new myPromise((resolve) => {
        resolve(fulfilledValueTwo);
      });
      const successfulPromiseThree = new myPromise((resolve) => {
        resolve(fulfilledValueThree);
      });

      return myPromise
        .all([
          successfulPromiseOne,
          successfulPromiseTwo,
          successfulPromiseThree,
        ])
        .then(([firstResult, secondResult, thirdResult]) => {
          expect(firstResult).toBe(fulfilledValueOne);
          expect(secondResult).toBe(fulfilledValueTwo);
          expect(thirdResult).toBe(fulfilledValueThree);
        });
    });
  });
  test.todo("check not called multiple times");
});
