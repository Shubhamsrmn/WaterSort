import { useCallback, useState } from "react";
import WaterColorContainer from "./components/WaterColorContainer";
import PrimaryButton from "./components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faGamepad,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import CompletedLevel from "./components/CompletedLevel";
import useHandleClickOutside from "./hooks/useHandleClickOutside";
import { useColorsContainersContext } from "./context/ColorContainersContext";
import useIsCompletedLevel from "./hooks/useIsCompletedLevel";
import { resetColorContainersFun } from "./utils/resetColorContainersFun";
import { previousTranferhandlerFun } from "./utils/previousTranferhandlerFun";
import { newGameHandlerFun } from "./utils/newGameHandlerFun";
function App() {
  const {
    sender,
    setSender,
    colorContainers,
    setColorContainers,
    tranferHistoryArr,
    tranfercolorsFunction,
  } = useColorsContainersContext();
  const [showCompletedLevel, setShowCompletedLevel] = useState(false);
  useIsCompletedLevel(colorContainers, setShowCompletedLevel);

  const outsideClickHandler = useCallback(() => {
    if (sender !== null) setSender(null);
  }, [sender, setSender]);
  useHandleClickOutside(outsideClickHandler);
  return (
    <div className="bg-[#35374B] min-h-screen flex flex-col items-center justify-center">
      {showCompletedLevel && (
        <CompletedLevel
          tranferCount={tranferHistoryArr.current.length}
          newGameHandler={() =>
            newGameHandlerFun(
              setColorContainers,
              tranferHistoryArr,
              setShowCompletedLevel
            )
          }
        />
      )}

      <PrimaryButton
        onClickHandler={() => {
          const lastTranfer = tranferHistoryArr.current.pop();
          if (lastTranfer)
            previousTranferhandlerFun(
              lastTranfer,
              tranfercolorsFunction,
              setSender
            );
        }}
        disabled={tranferHistoryArr.current.length === 0}
        buttonStyle="absolute left-4 top-4"
      >
        <FontAwesomeIcon icon={faChevronLeft} color="#C683D7" size="lg" />
      </PrimaryButton>
      <PrimaryButton
        onClickHandler={() =>
          resetColorContainersFun(
            tranferHistoryArr,
            setSender,
            setColorContainers
          )
        }
        disabled={tranferHistoryArr.current.length === 0}
        buttonStyle="absolute right-4 top-4"
      >
        <FontAwesomeIcon icon={faRotateLeft} color="#C683D7" size="lg" />
      </PrimaryButton>

      <div className="flex items-center justify-center gap-16 mx-auto max-lg:gap-10 max-md:gap-6 max-sm:flex-wrap max-sm:gap-y-8">
        {colorContainers.map((_, idx) => (
          <div
            className="water-color-container"
            key={idx + colorContainers[idx].toString()}
          >
            <WaterColorContainer
              index={idx}
              lastTranfer={tranferHistoryArr.current.slice(-1)[0] || null}
            />
          </div>
        ))}
      </div>

      <PrimaryButton
        onClickHandler={() =>
          newGameHandlerFun(
            setColorContainers,
            tranferHistoryArr,
            setShowCompletedLevel
          )
        }
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
