class myPromise {
  constructor(executor) {
    this.__status = "pending";
    this.__value = undefined;

    executor(
      (fulfillmentValue) => {
        this.__status = "fulfilled";
        this.__value = fulfillmentValue;
      },
      (rejectedValue) => {
        this.__status = "rejected";
        this.__value = rejectedValue;
      }
    );
  }
  then() {
    return new myPromise(() => {});
  }
  catch() {
    return new myPromise(() => {});
  }
}

module.exports = myPromise;
