const myPromise = require("../my-promise");
const fs = require("fs");
const path = require("path");

const pathToSong = path.join(__dirname, "..", "test-files", "song-lyrics.txt");
const songTxt = fs.readFileSync(pathToSong, "utf-8");

describe("Async functionality", () => {
  it("should handle an async process without issue", (done) => {
    const readSongLyricsPromise = new myPromise((resolve) => {
      fs.readFile(pathToSong, "utf-8", (_, txt) => {
        if (_) throw new Error("test suite error: song should exist in repo");
        else resolve(txt);
      });
    });
    readSongLyricsPromise.then((result) => {
      console.log("FINISHED Article:\n\n", result);
      expect(result).toBe(songTxt);
      done();
    });
  });
});
