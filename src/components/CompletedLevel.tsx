import { faStar as filled } from "@fortawesome/free-solid-svg-icons";
import { faStar as unFilled } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

type props = {
  tranferCount: number;
  newGameHandler: () => void;
};

const color = "#FFC23C";
const CompletedLevel: React.FC<props> = ({ tranferCount, newGameHandler }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      newGameHandler();
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [newGameHandler]);
  const score = 100 - tranferCount * 2;
  const starLevel = score > 80 ? 3 : score > 50 ? 2 : 1;
  return (
    <div
      className={
        "h-screen w-full fixed z-[1] text-[#FFC23C] font-semibold uppercase text-center italic flex flex-col items-center justify-around py-12"
      }
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
      }}
    >
      <p className="text-[5.2rem] max-md:text-[4rem] max-sm:text-[3.2rem]  completedLevelText">
        Level completed
      </p>
      <div className="flex items-center justify-center gap-8 my-12">
        <FontAwesomeIcon
          icon={starLevel >= 1 ? filled : unFilled}
          className="text-[10rem] max-md:text-[6rem] max-sm:text-[4rem]"
          color={color}
        />
        <FontAwesomeIcon
          icon={starLevel >= 2 ? filled : unFilled}
          className="text-[10rem] max-md:text-[6rem] max-sm:text-[4rem]"
          color={color}
        />
        <FontAwesomeIcon
          icon={starLevel >= 3 ? filled : unFilled}
          className="text-[10rem] max-md:text-[6rem] max-sm:text-[4rem]"
          color={color}
        />
      </div>
      <p className="text-[4rem] font-serif underline max-md:text-[2.8rem] max-sm:text-[2rem]">
        Score
        <strong className="not-italic">
          {" : "}
          {score}
        </strong>
      </p>
    </div>
  );
};

export default CompletedLevel;
