const stopword = require('stopword'),
  Sugar = require('sugar'),
  customStopwords = require('./stopwords.json')

Sugar.extend()

class Matcher {
  constructor(text1, text2) {
    this.words1 =  words(text1),
    this.words2 = words(text2)
  } 

  match() {
    let matches = [],
      phraseLength = 1

    while (true) {
      let phrases1 = phrases(this.words1, phraseLength),
        phrases2 = phrases(this.words2, phraseLength)

      if (phrases1.length && phrases2.length) {
        let commonPhrases = common(phrases1, phrases2)
        if (commonPhrases.length) {
          matches = matches.concat(commonPhrases)
          phraseLength++
        } else {
          return matches
        }
      }
    }
  }
}

function words(text) {
  let words = text.replace(/[^\w\s]|_/g, '').split(/\s+/g).map((w) => w.toLowerCase())
  return stopword.removeStopwords(stopword.removeStopwords(words), customStopwords)
}

function common(words1, words2) {
  let w1 = JSON.parse(JSON.stringify(words1)),
    w2 = JSON.parse(JSON.stringify(words2))
  return w1.sortBy().unique().intersect(w2)
}

function phrases(words, phraseLength) {
  let phrases = []

  if (phraseLength < 1) {
    return phrases
  }

  for (let i = 0; i <= words.length - phraseLength; i++) {
    let phrase = []
    for (let j = 0; j < phraseLength; j++) {
      phrase.push(words[i + j])
    }

    phrases.push(phrase.join(' '))
  }

  return phrases
}

module.exports = Matcher