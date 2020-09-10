const myPromise = require('./my-promise');

//temp rough
function resolve(value) {
  this.status = 'fulfilled';
  this.value = value;
}

function reject(value) {
  this.status = 'rejected';
  this.value = value;
}

function createPromise(name, output) {
  const prom = {
    resolve,
    reject,
    name,
    then,
    status: 'pending',
    value: undefined,
    init: function () {
      setTimeout(() => {
        this.resolve(output);
      }, 0);
      return this;
    },
  };
  return prom.init();
}

const defaultProm = createPromise('default', 'orange');
const promOne = createPromise('ONE', 'banana');
const promTwo = createPromise('TWO', 'apple');

function then(cb) {
  //pass a new promise to allow further chaining
  //invoke cb with p.value if p.status is fulfilled
  //use cb return value to decide value of then then of already returned promise

  //stop this from firing before previous promise (orange is bad, we want apple)
  //find a way to pass the result from previous onFulfilment promise
  if (this.status === 'fulfilled') {
    if (this.name === 'default') {
      return;
    } else {
      const result = cb(this.value);
      if (result instanceof myPromise) return myPromise;
    }
    console.log(this.name, 'then finished value:', this.value);
  }
  if (
    (this.status === 'pending' && this.name === 'default') ||
    this.status === 'pending'
  ) {
    setImmediate(() => {
      this.then(cb);
    });
  }
  return defaultProm;
}

const applePromise = promOne.then((result) => {
  console.log('is this banana: ', result);
  return promTwo.init();
});

console.log(applePromise);
applePromise.then((result) => {
  console.log('is this apple: ', result);
});
