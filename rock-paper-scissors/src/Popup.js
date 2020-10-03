import React from "react";

const Popup = ({
  gameState,
  renderComponent,
  userChoice,
  computerChoice,
  resetGame,
}) => {
  return (
    gameState && (
      <div className={`game-state ${gameState}`} onClick={resetGame}>
        <div>
          <div className="game-state-content">
            <p>{renderComponent(userChoice)}</p>
            <p>You {gameState}!</p>
            <p>{renderComponent(computerChoice)}</p>
          </div>
          <button>Play Again</button>
        </div>
      </div>
    )
  );
};

export default Popup;
