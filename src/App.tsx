import { useRef, useState } from "react";
import WaterColorContainer from "./components/WaterColorContainer";
const AllColors = ["#CD1818", "#FF6500", "#F8E559", "#864AF9"];
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateInitialColorsContainers = () => {
  const filledContainerCount = getRandomNumber(2, 4);
  const filledColorsContainers = [];
  let maxColorsCount = Array.from({ length: filledContainerCount }, () => 4);
  for (let index = 0; index < filledContainerCount; index++) {
    const singleColorArr: string[] = [];
    let tempMaxColorsCount;
    do {
      tempMaxColorsCount = [...maxColorsCount];
      for (let j = 0; j < 4; j++) {
        let randomIdx;
        do {
          randomIdx = getRandomNumber(0, filledContainerCount - 1);
        } while (tempMaxColorsCount[randomIdx] <= 0);
        tempMaxColorsCount[randomIdx]--;
        singleColorArr[j] = AllColors[randomIdx];
      }
    } while (
      singleColorArr[0] === singleColorArr[1] &&
      singleColorArr[0] === singleColorArr[2] &&
      singleColorArr[0] === singleColorArr[3]
    );
    maxColorsCount = [...tempMaxColorsCount];
    filledColorsContainers[index] = singleColorArr;
  }
  const finalContainers = [...filledColorsContainers, [], []];
  return finalContainers;
};
function App() {
  const [sender, setSender] = useState<number | null>(null);
  const [colorContainers, setColorContainers] = useState<string[][]>(
    generateInitialColorsContainers
  );
  const tranferHistoryArr = useRef<
    { sender: number; receiver: number; tranferCnt: number }[]
  >([]);
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
      });
    }
    setColorContainers(newColorContainers);
  };
  return (
    <div className="bg-[#35374B] h-screen">
      <div className="py-20 flex items-center justify-center gap-20">
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
      <button
        className=" border p-4 text-white"
        onClick={() => {
          const lastTranfer = tranferHistoryArr.current.pop();
          if (!lastTranfer) return;
          tranfercolorsFunction(
            lastTranfer.receiver,
            lastTranfer.sender,
            lastTranfer.tranferCnt,
            false
          );
        }}
      >
        previos
      </button>
    </div>
  );
}

export default App;
