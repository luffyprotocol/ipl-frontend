const fs = require("fs");

function assignSequentialValues(team1Data, team2Data) {
  let team1players = team1Data.player.filter((player) => player.id);
  let team2players = team2Data.player.filter((player) => player.id);
  let players = [...team1players, ...team2players];
  console.log(players.length);
  const playerIdMap = {};

  players.forEach((player, index) => {
    playerIdMap[player.id] = index;
  });

  return playerIdMap;
}

function writeJSONFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function processDataAndWriteToFile(input1, input2, outputFilePath) {
  try {
    const team1Data = require(input1);
    const team2Data = require(input2);
    const playerIdMap = assignSequentialValues(team1Data, team2Data);
    writeJSONFile(outputFilePath, playerIdMap);
    console.log(`Data processed and written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error processing data:", error);
  }
}
const team1 = "rr";
const team2 = "pbks";

// Example usage:
const input1 = "./teams/" + team1 + ".json"; // Provide the path to your input JSON file
const input2 = "./teams/" + team2 + ".json"; // Provide the path to your input JSON file
const outputFilePath = "./fixtures-remapping/" + team1 + "vs" + team2 + ".json"; // Provide the path where you want to save the output JSON file

processDataAndWriteToFile(input1, input2, outputFilePath);
