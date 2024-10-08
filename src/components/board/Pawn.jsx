const Pawn = ({ colour, level }) => {
  return (
    <div className="flex gap-1  items-center ">
      {Array(level)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              className={`z-1 w-[15px]  h-[15px] rounded-full border border-black ${
                colour === "red" ? "bg-red-500" : "bg-green-500"
              }`}
            />
          );
        })}
    </div>
  );
};

export default Pawn;
