class myPromise {
  constructor(executor) {
    this.__status = 'pending';
    this.__value = undefined;
    this.__thenCallbacks = [];
    this.__propogatedResolve = undefined;
    this.__propogatedReject = undefined;
    executor(this.__resolve.bind(this), this.__reject.bind(this));
  }

  __resolve(fulfillmentValue) {
    this.__status = 'fulfilled';
    this.__value = fulfillmentValue;
  }

  __reject(rejectedValue) {
    this.__status = 'rejected';
    this.__value = rejectedValue;
  }

  then(onFulfillment) {
    setImmediate(() => {
      //if promise is pending...
      //exit and put a new then on the immediate queue
      if (this.__status === 'pending') {
        return setImmediate(() => {
          this.then(onFulfillment);
        });
      } else {
        //otherwise we must be resolved/rejected
        //get result back from then callback
        const result = onFulfillment(this.__value);
        if (result instanceof myPromise) {
          return this.__propogatedResolve(result.__value);
        } else {
          return this.__propogatedResolve(result);
        }
      }
    });
    //if we have no new promise resolve function
    //then we havent creates a promise for the sync code
    if (!this.__propogatedResolve) {
      //create a promise for the purpose of chaining future
      const newProm = new myPromise(() => {});

      this.__propogatedResolve = this.__resolve.bind(newProm);
      //return promise for chaining next then on
      return newProm;
    }
    //this return only matters in the first run since other calls with by async
  }

  catch(onRejection) {
    if (this.__status === 'pending') {
      setImmediate(() => {
        this.catch(onRejection);
      });
    } else if (this.__status === 'rejected') {
      onRejection(this.__value);
    }
  }

  static all(promises) {
    return new myPromise((resolve) => {
      if (!promises.length) resolve([]);
      else {
        const results = [];
        promises.forEach((promise) => {
          return promise.then((result) => {
            results.push(result);

            resolve(results);
          });
        });
      }
    });
  }
}

module.exports = myPromise;
