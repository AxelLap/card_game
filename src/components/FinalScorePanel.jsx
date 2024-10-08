import useGameStore from "../store/gameStore";
import useUpdateScore from "../hooks/useUpdateScore";
import { useEffect } from "react";

const FinalScorePanel = () => {
  const { updateScore } = useUpdateScore();
  const score = useGameStore((state) => state.score);

  console.log(score);

  const rowScores = useGameStore((state) => state.rowScores);

  useEffect(() => {
    updateScore();
  }, [rowScores]);

  return (
    <>
      <span className="text-green-500 absolute left-10 bottom-[390px] text-2xl">
        {score.green}
      </span>
      <span className="text-red-500 absolute right-10 bottom-[390px] text-2xl">
        {score.red}
      </span>
    </>
  );
};

export default FinalScorePanel;
