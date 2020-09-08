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
    if (this.__status === "fulfilled") {
      const onFulfillmentResult = onFulfillment(this.__value);
      if (onFulfillmentResult instanceof myPromise) return onFulfillmentResult;
      else
        return new myPromise((resolve) => {
          resolve(onFulfillmentResult);
        });
    } else if (this.__status === "rejected") return this;
    return new myPromise(() => {});
  }
  catch(onRejection) {
    if (this.__status === "rejected") onRejection(this.__value);
    if (this.__status === "fulfilled") return this;
    return new myPromise(() => {});
  }
}

module.exports = myPromise;
