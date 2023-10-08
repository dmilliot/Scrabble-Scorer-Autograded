// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word:");
   // points = oldScrabbleScorer(word);
   // console.log(points);
   return word;
};

// let simpleScorer;
function simpleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (i=0; i<word.length; i++) {
      score += 1;
   }
   return score;
}

// let vowelBonusScorer;
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U', 'Y']
   let score = 0;
   for (i=0; i<word.length; i++) {
      if(vowels.includes(word[i])) {
         score +=3;
      } else {
         score +=1;
      }
   }
   return score
}

let scoringAlgorithm1 = {
   name: 'Simple Score',
   description: '1 point per letter.',
   scorerFunction: simpleScorer
}
let scoringAlgorithm2 = {
   name: 'Bonus Vowels',
   description: '3 points for vowels, 1 point for all else.',
   scorerFunction: vowelBonusScorer
}
let scoringAlgorithm3 = {
   name: 'Scrabble',
   description: 'Traditional scoring algorithm',
   scorerFunction: scrabbleScorer
}

// let scrabbleScorer;
function scrabbleScorer(word) {
   score = 0;
   word = word.toLowerCase();
   for (i=0; i<word.length; i++) {
      let points = newPointStructure[word[i]];
      score += points;
      }
   return score;
}

const scoringAlgorithms = [scoringAlgorithm1, scoringAlgorithm2, scoringAlgorithm3];

function scorerPrompt() {
   scorerToUse = input.question(`\n Which scorer would you like to use?\n
   Enter 0 for simple scorer.\n
   Enter 1 for vowel bonus scoring.\n
   enter 2 for scrabble scoring.`);
   return scoringAlgorithms[scorerToUse];
}
// take bits from oldscorer and put into new object with LOWERCASE and as parameters: value.
function transform(obj) {
   newScrabbleScorer = {};
   for(pointValue in obj) {
      for(const letter of obj[pointValue]) {
         newScrabbleScorer[letter.toLowerCase()] = Number(pointValue);
      }
   }
   return newScrabbleScorer;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   word = initialPrompt();
   scorerToUse = scorerPrompt();
   score = scorerToUse.function(word);
   console.log(`You got ${score} points.`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
