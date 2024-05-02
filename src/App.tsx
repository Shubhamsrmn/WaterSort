import { useState } from "react";
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
  const [colorContainers, setColorContainer] = useState<string[][]>(
    generateInitialColorsContainers
  );
  return (
    <div className="bg-[#35374B] h-screen flex items-center justify-center gap-24">
      {colorContainers.map((_, idx) => (
        <WaterColorContainer
          key={idx}
          index={idx}
          colorContainers={colorContainers}
          setColorContainers={setColorContainer}
          sender={sender}
          setSender={setSender}
        />
      ))}
    </div>
  );
}

export default App;
