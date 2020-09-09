//temp rough
function resolve(value) {
  this.status = "fulfilled";
  this.value = value;
}

function reject(value) {
  this.status = "rejected";
  this.value = value;
}

const defaultProm = {
  name: "default",
  status: "pending",
  value: undefined,
  resolve: resolve,
  init: function () {
    setTimeout(() => {
      this.resolve("orange");
    }, 0);
    return this;
  },
  then: then,
};

const promOne = {
  name: 1,
  status: "pending",
  value: undefined,
  resolve: resolve,
  init: function () {
    setTimeout(() => {
      this.resolve("banana");
    }, 0);
  },
  then: then,
};

const promTwo = {
  name: 2,
  status: "pending",
  value: undefined,
  resolve: resolve,
  init: function () {
    setTimeout(() => {
      this.resolve("apple");
    }, 0);
    return this;
  },
  then: then,
};

function then(cb) {
  // console.log(".........", this.name, "calling then.......\n");
  const defaultPromise = defaultProm.init();
  //if previous promise
  if (this.name === "default") {
    console.log("we need to wait");
    setImmediate(() => {
      this.then(cb);
    });
  }
  //stop this from firing before previous promise (orange is bad, we want apple)
  //find a way to pass the result from previous onFulfilment promise
  if (this.status === "pending") {
    setImmediate(() => {
      this.then(cb);
    });
  } else {
    console.log(this.name, "then value", this.value);
  }
  return defaultPromise;
}

promOne.init();

const applePromise = promOne.then((result) => {
  console.log("is this banana: ", result);
  return promTwo.init();
});

console.log(applePromise);
applePromise.then((result) => {
  console.log("is this apple: ", result);
});
