import React from "react";

const GameStats = ({ wins, losses }) => {
  return (
    <div className="wins-losses">
      <div className="wins">
        <span className="number">{wins}</span>
        <span className="text">{wins.length === 1 ? "Win" : "Wins"}</span>
      </div>

      <div className="losses">
        <span className="number">{losses}</span>
        <span className="text">{losses.length === 1 ? "Loss" : "Losses"}</span>
      </div>
    </div>
  );
};

export default GameStats;
