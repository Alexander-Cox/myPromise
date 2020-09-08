const myPromise = require("./my-promise");

jest.setTimeout(500);
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
        expect(testPromise.then(() => {})).toBeInstanceOf(myPromise);
      });
      it("should take an onFulfillment callback which passes the myPromise value as the arg", (done) => {
        const fulfillmentValue = {};
        const testPromise = new myPromise((resolve) => {
          resolve(fulfillmentValue);
        });
        testPromise.then((data) => {
          expect(data).toBe(fulfillmentValue);
          done();
        });
      });
      it("only gets called if fulfilled", () => {
        const testPromise = new myPromise((_, reject) => {
          reject();
        });
        testPromise.then(() => {
          throw new Error("This then block should not have run");
        });
      });
      it("should allow chaining of myPromises", (done) => {
        const valueOne = { 1: "hello" };
        const testPromiseOne = new myPromise((resolve) => {
          resolve(valueOne);
        });
        const valueTwo = { 2: "hi" };
        const testPromiseTwo = new myPromise((resolve) => {
          resolve(valueTwo);
        });
        testPromiseOne
          .then((resultOne) => {
            expect(resultOne).toBe(valueOne);
            return testPromiseTwo;
          })
          .then((resultTwo) => {
            expect(resultTwo).toBe(valueTwo);
            done();
          });
      });
      it("should pass along anything other than a myPromise as the next promise resolved value", (done) => {
        const testObj = { "not-a-promise": true };
        const testPromiseTwo = new myPromise((resolve) => {
          resolve();
        });
        testPromiseTwo
          .then(() => {
            return testObj;
          })
          .then((result) => {
            expect(result).toBe(testObj);
            done();
          });
      });
      it("allows for the a chained .catch to fire if its rejects", (done) => {
        const value = { 1: "rejected" };
        const testPromise = new myPromise((_, reject) => {
          reject(value);
        });
        testPromise
          .then(() => {})
          .catch((result) => {
            expect(result).toBe(value);
            done();
          });
      });
    });
    describe("catch", () => {
      it("should return a new instance of the promise", () => {
        const testPromise = new myPromise(() => {});
        expect(testPromise.catch(() => {})).toBeInstanceOf(myPromise);
      });
      it("should take an onRejection callback which passes the myPromise value as the arg if the myPromise is rejected", (done) => {
        const rejectValue = {};
        const testPromise = new myPromise((_, reject) => {
          reject(rejectValue);
        });
        testPromise.catch((err) => {
          expect(err).toBe(rejectValue);
          done();
        });
      });
      test.todo("why cant we return the myPromises?");
      it("only gets called if rejected", () => {
        const testPromise = new myPromise((resolve) => {
          resolve();
        });
        testPromise.catch(() => {
          throw new Error("This catch block should not have run");
        });
      });
      it("allows for the a chained .then to fire if its resolved", (done) => {
        const value = { 1: "hello" };
        const testPromise = new myPromise((resolve) => {
          resolve(value);
        });
        testPromise
          .catch(() => {})
          .then((result) => {
            expect(result).toBe(value);
            done();
          });
      });
    });
    describe("method chaining", () => {
      test.todo(
        "should skip then then block and move straight to the catch if initial promise is rejected"
      );
    });
  });
});
