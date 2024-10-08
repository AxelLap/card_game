import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import clsx from "clsx";

import "./App.css";

import useFirstDraw from "./hooks/useFirstDraw";
import useSwitchPlayer from "./hooks/useswitchPlayer";
import useGameStore from "./store/gameStore";

import Board from "./components/board/Board";
import Hand from "./components/Hand";
import ScorePanel from "./components/ScorePanel";

function App() {
  const firstDraw = useFirstDraw();
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  const setIsGameStarted = useGameStore((state) => state.setIsGameStarted);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const setIsGameOver = useGameStore((state) => state.setIsGameOver);
  const noMoreMoves = useGameStore((state) => state.noMoreMoves);
  const switchPlayer = useSwitchPlayer();

  return (
    <div className="flex flex-col items-center justify-start h-full m-10 text-6xl gap-10">
      <DndProvider backend={HTML5Backend}>
        <h2>My Card Game</h2>
        <div className="flex h-auto w-4/5 justify-center">
          <ScorePanel color="green" />
          <Board />
          <ScorePanel color="red" />
        </div>
        {isGameStarted === true ? (
          <div className="w-full h-full flex justify-center items-center gap-2">
            <Hand />
            <button
              className={clsx(
                currentPlayer === "green" ? "bg-green-500" : "bg-red-500",
                "w-[150px] h-[50px] flex items-center justify-center rounded text-2xl"
              )}
              onClick={switchPlayer}
            >
              <span className="text-white">Pass Turn</span>
            </button>
          </div>
        ) : (
          <button
            className="flex justify-center items-center "
            onClick={() => {
              setIsGameStarted(true);
              firstDraw();
            }}
          >
            Launch Game
          </button>
        )}
      </DndProvider>
    </div>
  );
}

export default App;
