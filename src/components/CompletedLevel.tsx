import { faStar as filled } from "@fortawesome/free-solid-svg-icons";
import { faStar as unFilled } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import completedSvg from "../../public/Winners-pana.svg";
type props = {
  tranferCount: number;
  newGameHandler: () => void;
};

const color = "#FFC23C";
const CompletedLevel: React.FC<props> = ({ tranferCount, newGameHandler }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      newGameHandler();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [newGameHandler]);
  const score = 100 - tranferCount * 2;
  const starLevel = score > 80 ? 3 : score > 50 ? 2 : 1;
  return (
    <div
      className={
        "h-screen w-full fixed z-[1] text-[#FFC23C] font-semibold uppercase text-center italic flex flex-col items-center justify-around py-8 max-sm:justify-center max-sm:gap-8"
      }
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
      }}
    >
      <p className="text-[3.2rem] max-sm:text-[2.4rem]">Level completed</p>
      <div className="w-80">
        <img src={completedSvg} alt="" />
      </div>
      <div className="flex items-center justify-center gap-8 my-8 max-md:gap-6 max-sm:gap-4 max-sm:my-4">
        <FontAwesomeIcon
          icon={starLevel >= 1 ? filled : unFilled}
          className="text-[5.2rem] max-md:text-[3.6rem] max-sm:text-[2.4rem]"
          color={color}
        />
        <FontAwesomeIcon
          icon={starLevel >= 2 ? filled : unFilled}
          className="text-[5.2rem] max-md:text-[3.6rem] max-sm:text-[2.4rem]"
          color={color}
        />
        <FontAwesomeIcon
          icon={starLevel >= 3 ? filled : unFilled}
          className="text-[5.2rem] max-md:text-[3.6rem] max-sm:text-[2.4rem]"
          color={color}
        />
      </div>
      <p className="text-[2.4rem] font-serif underline max-md:text-[1.8rem]">
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
