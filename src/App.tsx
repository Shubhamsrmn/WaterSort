import { useRef, useState } from "react";
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

const filledContainerCount = getRandomNumber(2, 4);

function App() {
  const [sender, setSender] = useState<number | null>(null);
  const [colorContainers, setColorContainers] = useState<string[][]>(
    generateInitialColorsContainers(filledContainerCount, true)
  );
  const tranferHistoryArr = useRef<
    { sender: number; receiver: number; tranferCnt: number; color: string }[]
  >([]);
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
      "initialFinalContainers",
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
    setColorContainers(JSON.parse(colorsContainersStr));
  };
  const newGameHandlerFun = () => {
    const newColorContainers = generateInitialColorsContainers(
      getRandomNumber(2, 4),
      false
    );
    setColorContainers(newColorContainers);
  };

  return (
    <div className="bg-[#35374B] min-h-screen relative">
      {isCompleted === false && (
        <>
          <div className="p-4 flex items-center justify-between mb-20 max-lg:mb-14 max-md:mb-10 max-sm:mb-6">
            <PrimaryButton
              onClickHandler={previousTranferFun}
              disabled={tranferHistoryArr.current.length === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} color="#C683D7" size="lg" />
            </PrimaryButton>
            <PrimaryButton
              onClickHandler={resetColorsContainersFun}
              disabled={tranferHistoryArr.current.length === 0}
            >
              <FontAwesomeIcon icon={faRotateLeft} color="#C683D7" size="lg" />
            </PrimaryButton>
          </div>
          <div className="flex items-center justify-center gap-20 mx-auto flex-wrap max-lg:gap-14 max-md:gap-10 max-sm:gap-6">
            {colorContainers.map((_, idx) => (
              <WaterColorContainer
                key={idx}
                index={idx}
                colorContainers={colorContainers}
                tranfercolorsFunction={tranfercolorsFunction}
                sender={sender}
                setSender={setSender}
              />
            ))}
          </div>
        </>
      )}
      <div className="p-4 pt-8 max-md:pt-6 max-sm:pt-4 ml-[calc(100%-12rem)]">
        <PrimaryButton
          onClickHandler={newGameHandlerFun}
          disabled={false}
          buttonStyle="w-[10rem] h-max flex items-center justify-center py-2 gap-2"
        >
          <p className="text-[#524C42] font-medium">New Game</p>
          <FontAwesomeIcon icon={faGamepad} color="#C683D7" size="lg" />
        </PrimaryButton>
      </div>
    </div>
  );
}

export default App;
