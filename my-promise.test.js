const myPromise = require("./my-promise");

describe("my-promise", () => {
  describe("PROPERTIES", () => {
    it('has a __status property initially set to "pending"', () => {
      const testPromise = new myPromise(() => {});
      expect(testPromise.__status).toBe("pending");
    });
    it('has a __value property initially set to "pending"', () => {
      const testPromise = new myPromise(() => {});
      expect(testPromise).toHaveProperty("__value");
      expect(testPromise.__value).toBe(undefined);
    });
  });
  describe("EXECUTOR FUNCTION", () => {
    it("should call the executor function pass as an argument", () => {
      const mockFn = jest.fn();
      new myPromise(mockFn);
      expect(mockFn).toHaveBeenCalled();
    });
    it("should take a resolve function that if called will change the status to fulfilled", () => {
      const testPromise = new myPromise((resolve) => {
        resolve();
      });
      expect(testPromise.__status).toBe("fulfilled");
    });
    it("should take a resolve function that if called with an argument will change the promise value to that arg", () => {
      const fulfilledValue = {};
      const testPromise = new myPromise((resolve) => {
        resolve(fulfilledValue);
      });
      expect(testPromise.__value).toBe(fulfilledValue);
    });
    it("should take a reject function that when called sets the status to rejected", () => {
      const testPromise = new myPromise((_, reject) => {
        reject();
      });
      expect(testPromise.__status).toBe("rejected");
    });
    it("should take a reject function that if called with an argument will change the promise value to that arg", () => {
      const rejectValue = new Error("something went wrong");
      const testPromise = new myPromise((_, reject) => {
        reject(rejectValue);
      });
      expect(testPromise.__value).toBe(rejectValue);
    });
  });
  describe("METHODS", () => {
    describe("then", () => {
      it("should return a new instance of the promise", () => {
        const testPromise = new myPromise(() => {});
        expect(testPromise.then()).toBeInstanceOf(myPromise);
      });
    });
    describe("catch", () => {
      it("should return a new instance of the promise", () => {
        const testPromise = new myPromise(() => {});
        expect(testPromise.catch()).toBeInstanceOf(myPromise);
      });
    });
  });
});
