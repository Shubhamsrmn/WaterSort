import { useCallback, useRef, useState } from "react";
import WaterColorContainer from "./components/WaterColorContainer";
import { getRandomNumber } from "./utils/getRandomNumber";
import { generateInitialColorsContainers } from "./utils/generateInitialColorsContainers";
import { checkIsCompletedSort } from "./utils/checkIsCompletedSort";
import PrimaryButton from "./components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faGamepad,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import CompletedLevel from "./components/CompletedLevel";

const filledContainerCount = getRandomNumber(2, 5);

function App() {
  const [sender, setSender] = useState<number | null>(null);
  const [colorContainers, setColorContainers] = useState<string[][]>(
    generateInitialColorsContainers(filledContainerCount, true)
  );
  const tranferHistoryArr = useRef<
    { sender: number; receiver: number; tranferCnt: number; color: string }[]
  >(JSON.parse(localStorage.getItem("tranferHistoryArr") || "[]"));
  const isCompleted = checkIsCompletedSort(colorContainers);
  const tranfercolorsFunction = (
    sender: number,
    receiver: number,
    tranferCnt: number,
    storeHistory: boolean = true
  ) => {
    const newColorContainers = [...colorContainers];
    for (let idx = 0; idx < tranferCnt; idx++) {
      const newReceiverTop = newColorContainers[sender].shift();
      if (newReceiverTop) newColorContainers[receiver].unshift(newReceiverTop);
    }
    if (storeHistory) {
      tranferHistoryArr.current.push({
        sender: sender,
        receiver: receiver,
        tranferCnt: tranferCnt,
        color: newColorContainers[receiver][0],
      });
    }

    localStorage.setItem(
      "tranferHistoryArr",
      JSON.stringify(tranferHistoryArr.current)
    );
    localStorage.setItem(
      "lastFinalContainers",
      JSON.stringify(newColorContainers)
    );
    setColorContainers(newColorContainers);
  };
  const previousTranferFun = () => {
    const lastTranfer = tranferHistoryArr.current.pop();
    if (!lastTranfer) return;
    tranfercolorsFunction(
      lastTranfer.receiver,
      lastTranfer.sender,
      lastTranfer.tranferCnt,
      false
    );
  };
  const resetColorsContainersFun = () => {
    const colorsContainersStr = localStorage.getItem("initialFinalContainers");
    if (!colorsContainersStr) return;
    const newColorContainers = JSON.parse(colorsContainersStr);
    localStorage.setItem(
      "lastFinalContainers",
      JSON.stringify(newColorContainers)
    );
    setColorContainers(newColorContainers);
  };
  const newGameHandlerFun = useCallback(() => {
    const newColorContainers = generateInitialColorsContainers(
      getRandomNumber(2, 5),
      false
    );
    setColorContainers(newColorContainers);
    tranferHistoryArr.current = [];
  }, []);
  return (
    <div className="bg-[#35374B] min-h-screen flex flex-col items-center justify-center">
      {isCompleted && (
        <CompletedLevel
          tranferCount={tranferHistoryArr.current.length}
          newGameHandler={newGameHandlerFun}
        />
      )}

      <PrimaryButton
        onClickHandler={previousTranferFun}
        disabled={tranferHistoryArr.current.length === 0}
        buttonStyle="absolute left-4 top-4"
      >
        <FontAwesomeIcon icon={faChevronLeft} color="#C683D7" size="lg" />
      </PrimaryButton>
      <PrimaryButton
        onClickHandler={resetColorsContainersFun}
        disabled={tranferHistoryArr.current.length === 0}
        buttonStyle="absolute right-4 top-4"
      >
        <FontAwesomeIcon icon={faRotateLeft} color="#C683D7" size="lg" />
      </PrimaryButton>

      <div className="flex items-center justify-center gap-16 mx-auto max-lg:gap-10 max-md:gap-6 max-sm:flex-wrap max-sm:gap-y-8">
        {colorContainers.map((_, idx) => (
          <WaterColorContainer
            key={idx + colorContainers[idx].toString()}
            index={idx}
            colorContainers={colorContainers}
            tranfercolorsFunction={tranfercolorsFunction}
            sender={sender}
            setSender={setSender}
          />
        ))}
      </div>

      <PrimaryButton
        onClickHandler={newGameHandlerFun}
        disabled={false}
        buttonStyle="!w-[10rem] h-max flex items-center justify-center py-2 gap-2 absolute bottom-4 right-4 z-[1] max-md:!w-[8rem] max-md:gap-1 max-sm:!h-[2rem]"
      >
        <p className="text-[#524C42] font-medium max-md:text-[0.9rem] max-sm:text-[0.8rem]">
          New Game
        </p>
        <FontAwesomeIcon icon={faGamepad} color="#C683D7" size="lg" />
      </PrimaryButton>
    </div>
  );
}

export default App;
