const myPromise = (value, shouldResolve = true) => {
  return new Promise((resolve, reject) => {
    if (shouldResolve) resolve(value);
    else reject(value);
  });
};
