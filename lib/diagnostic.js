'use strict';

// Reuse functions wherever possible.

const addOne = function (num) {
  return (num || 0) + 1;
};

// 1. Write a function that takes a string argument
// splits it into an array of normalized words
// (uppercase strings without punctuation)
// and returns that array.
const normalizeWords = function (text) {
  let words = text.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.replace(/\W+/, '').toUpperCase();
  }

  return words;
};

// 4. Write a function that returns a dictionary with unique words as keys
// and a count of each word as the calue for that key
const wordFrequencies = function (text) {
  let wordDictionary = {};
  let normalizedWords = normalizeWords(text);
  for (let i = 0; i < normalizedWords.length; i++) {
    let word = normalizedWords[i];
    wordDictionary[word] = addOne(wordDictionary[word]);
  }

  return wordDictionary;
};

// 2. Write a function that takes a string arguments
// and returns an array of unique normalized words.
const uniqueWords = function (text) {
  let wordDictionary = wordFrequencies(text);
  let keys = [];
  let i = 0;
  for (keys[i++] in wordDictionary); // jshint ignore: line
  return keys;
};

// 3. Write a function that returns the count of words in a string.
// Provid the *option* to count unique words instead of total words.
const wordCount = function (text, unique) {
  if (unique) {
    return uniqueWords(text).length;
  }

  return normalizeWords(text).length;
};

module.exports = {
  normalizeWords,
  uniqueWords,
  wordCount,
  wordFrequencies,
};
