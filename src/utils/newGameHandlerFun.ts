import { generateInitialColorsContainers } from "./generateInitialColorsContainers";
import { getRandomNumber } from "./getRandomNumber";

export const newGameHandlerFun = (
  setColorContainers: React.Dispatch<React.SetStateAction<string[][]>>,
  tranferHistoryArr: React.MutableRefObject<
    {
      sender: number;
      receiver: number;
      tranferCnt: number;
      color: string;
    }[]
  >,
  setShowCompletedLevel: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newColorContainers = generateInitialColorsContainers(
    getRandomNumber(2, 5),
    false
  );
  setShowCompletedLevel(false);
  setColorContainers(newColorContainers);
  tranferHistoryArr.current = [];
};
