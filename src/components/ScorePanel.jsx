import FinalScorePanel from "./FinalScorePanel";

import useGameStore from "../store/gameStore";

import clsx from "clsx";

const ScorePanel = ({ color }) => {
  const score = useGameStore((state) => state.score);
  const rowScores = useGameStore((state) => state.rowScores); // Récupère rowScores

  const { isGameStarted, isGameOver } = useGameStore();

  return (
    <div
      className="w-[250px] flex flex-col items-center w-full text-2xl gap-3"
      style={{
        opacity: isGameStarted === false ? 0.5 : 1,
      }}
    >
      {!isGameOver &&
        rowScores.map((row, index) => (
          <div
            key={index}
            className="w-[100px] h-[100px] flex justify-center items-center mb-7"
          >
            <span
              className={clsx(
                color === "green" ? "bg-green-500" : "bg-red-500",
                " h-4/5 w-4/5 flex justify-center items-center text-white rounded-full",
                (color === "green" && row.green < row.red) ||
                  (color === "red" && row.red < row.green)
                  ? "opacity-50"
                  : "opacity-100"
              )}
            >
              {color === "green" ? row.green : row.red}
            </span>
          </div>
        ))}
      {isGameOver && <FinalScorePanel />}
    </div>
  );
};

export default ScorePanel;
