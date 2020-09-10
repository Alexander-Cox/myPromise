const myPromise = require('../my-promise');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const { expect } = require('chai');

const pathToSongLife = path.join(__dirname, '..', 'test-files', 'life.txt');
const pathToSongPromisesPromises = path.join(
  __dirname,
  '..',
  'test-files',
  'promises-promises.txt'
);
const lifeSongLyrics = fs.readFileSync(pathToSongLife, 'utf-8');
const incubusLyrics = fs.readFileSync(pathToSongPromisesPromises, 'utf-8');

describe('Async functionality', () => {
  it('should handle a passing async process without issue', (done) => {
    const readSongLyricsPromise = new myPromise((resolve) => {
      fs.readFile(pathToSongLife, 'utf-8', (_, txt) => {
        if (_) throw new Error('TEST SUITE ERROR: song should exist in repo');
        else resolve(txt);
      });
    });
    readSongLyricsPromise.then((result) => {
      expect(result).to.equal(lifeSongLyrics);
      done();
    });
  });
  it('should handle a failing async process without issue', (done) => {
    const readSongLyricsPromise = new myPromise((_, reject) => {
      fs.readFile('broken-path-to-song', 'utf-8', (err) => {
        reject('broken-path-to-song');
      });
    });
    readSongLyricsPromise.catch((result) => {
      expect(result).to.equal('broken-path-to-song');
      done();
    });
  });
  it('should skip the then block and go to the catch if it fails', (done) => {
    const readSongLyricsPromise = new myPromise((_, reject) => {
      fs.readFile('broken-path-to-song', 'utf-8', (err) => {
        reject('broken-path-to-song');
      });
    });
    readSongLyricsPromise
      .then(() => {
        throw new Error('TEST SUITE ERROR: This cb should not fire');
      })
      .catch((result) => {
        expect(result).to.equal('broken-path-to-song');
        done();
      });
  });
  it('should allow chaining of another .then returning a non-promise object', (done) => {
    const lifeLyricsPromise = new myPromise((resolve) => {
      fs.readFile(pathToSongLife, 'utf-8', (_, txt) => {
        if (_) throw new Error('TEST SUITE ERROR: song should exist in repo');
        else resolve(txt);
      });
    });
    const simpleObj = { fulfilled: true, satiated: false };
    const successfulPromise = new myPromise((resolve) => {
      resolve(simpleObj);
    });
    successfulPromise
      .then((result) => {
        expect(result).to.equal(simpleObj);
        return lifeLyricsPromise;
      })
      .then((result) => {
        expect(result).to.equal(lifeSongLyrics);
        done();
      });
  });
  it('should handle multiple async processes using chaining', () => {
    const lifeLyricsPromise = new myPromise((resolve) => {
      fs.readFile(pathToSongLife, 'utf-8', (_, txt) => {
        if (_) throw new Error('TEST SUITE ERROR: song should exist in repo');
        else resolve(txt);
      });
    });
    const promisesPromisesLyricsPromise = new myPromise((resolve) => {
      fs.readFile(pathToSongPromisesPromises, 'utf-8', (_, txt) => {
        if (_) throw new Error('TEST SUITE ERROR: song should exist in repo');
        else resolve(txt);
      });
    });
    return lifeLyricsPromise
      .then((result) => {
        expect(result).to.equal(lifeSongLyrics);
        return promisesPromisesLyricsPromise;
      })
      .then((result) => {
        expect(result).to.equal(incubusLyrics);
      });
  });
  // test.todo('error propagation');
});
