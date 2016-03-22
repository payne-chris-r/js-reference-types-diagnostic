'use strict';

const gettysburg = require('../data/gettysburg');

const diagnostic = require('../lib/diagnostic.js');

const addOne = (num) => (num || 0) + 1;

const normalizeWords = (text) => text.split(/\s+/)
  .map((word) => word.replace(/\W+/, '').toUpperCase());

const wordFrequencies = (text) => normalizeWords(text)
  .reduce((frequencies, word) => {
    frequencies[word] = addOne(frequencies[word]);
    return frequencies;
  }, {});

const uniqueWords = (text) => Object.keys(wordFrequencies(text));

const wordCount = (text, unique) => // jshint ignore: line
  unique ? uniqueWords(text).length : normalizeWords(text).length;

describe('JavaScript references types diagnostic', () => {

  describe('normalized words', () => {

    let normalizedWords = normalizeWords(gettysburg);

    it('has the correct length', () => {
      expect(diagnostic.normalizedWords(gettysburg).length).toBe(52);
    });

    it('matches expected array', () => {
      expect(diagnostic.normalizedWords(gettysburg).sort())
        .toEqual(normalizedWords.sort());
    });

  });

  describe('unique words', () => {

    const uniquedWords = uniqueWords(gettysburg);

    it('has the correct length', () => {
      expect(diagnostic.uniqueWords(gettysburg).length).toBe(38);
    });

    it('matches expected array', () => {
      expect(diagnostic.uniqueWords(gettysburg).sort())
        .toEqual(uniquedWords.sort());
    });

  });

  describe('word count', () => {

    it('has the correct word count', () => {
      expect(diagnostic.wordCount(gettysburg)).toBe(52);
    });

    it('has the correct unique word count', () => {
      expect(diagnostic.wordCount(gettysburg, true)).toBe(38);
    });

  });

  describe('word frequencies', () => {

    const wordFrequencied = wordFrequencies(gettysburg);

    it('has the correct length', () => {
      expect(Object.keys(diagnostic.wordFrequencies(gettysburg)).length).toBe(49);
    });

    it('matches dictionary', () => {
      expect(diagnostic.wordFrequencies(gettysburg)).toEqual(wordFrequencied);
    });

  });

});
