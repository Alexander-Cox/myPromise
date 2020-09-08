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
  then(onFulfillment) {
    if (this.__status === "fulfilled") onFulfillment(this.__value);
    return new myPromise(() => {});
  }
  catch(onRejection) {
    if (this.__status === "rejected") onRejection(this.__value);
    return new myPromise(() => {});
  }
}

module.exports = myPromise;
