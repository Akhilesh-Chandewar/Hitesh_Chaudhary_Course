let gameName = "Chess";
gameName = "Checkers";
console.log("Game Name:", gameName);

const gameType = "Board Game";
gameType = "Card Game"; // This will throw an error because 'const' variables cannot be reassigned
console.log("Game Type:", gameType);