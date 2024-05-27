import React from "react";
import PlayerCard from "./PlayerCard";

const players = [
  { name: "Ruturaj Gaikwad", team: "csk", position: "Batter", points: 100 },
  { name: "Quinton de Kock", team: "lsg", position: "WK-Batter", points: 105 },
  { name: "Prithvi Shaw", team: "dc", position: "Batter", points: 110 },
  { name: "Ishant Sharma", team: "dc", position: "Bowler", points: 210 },
  { name: "Virat Kohli", team: "rcb", position: "Batter", points: 310 },
  { name: "Shubman Gill", team: "gt", position: "Batter", points: 101 },
  { name: "David Miller", team: "gt", position: "WK-Batter", points: 510 },
  { name: "Rohit Sharma", team: "mi", position: "Batter", points: 101 },
];

const PlayerCarousel = () => {
  return (
    <div className="flex overflow-hidden space-x-16 group">
      <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            name={player.name}
            team={player.team}
            position={player.position}
            points={player.points}
          />
        ))}
      </div>
      <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            name={player.name}
            team={player.team}
            position={player.position}
            points={player.points}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerCarousel;
