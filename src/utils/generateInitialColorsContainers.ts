import { getRandomNumber } from "./getRandomNumber";

const AllColors = ["#CD1818", "#FF6500", "#F8E559", "#864AF9"];
export const generateInitialColorsContainers = (
  filledContainerCount: number,
  restoreFromStorages: boolean
) => {
  if (restoreFromStorages) {
    const colorsContainersStr = localStorage.getItem("initialFinalContainers");
    if (colorsContainersStr) return JSON.parse(colorsContainersStr);
  }
  const filledColorsContainers = [];
  let maxColorsCount = Array.from({ length: filledContainerCount }, () => 4);
  for (let i = 0; i < filledContainerCount; i++) {
    const singleColorArr: string[] = [];
    let tempMaxColorsCount;
    do {
      tempMaxColorsCount = [...maxColorsCount];
      for (let j = 0; j < 4; j++) {
        let randomIdx;
        do {
          randomIdx = getRandomNumber(0, filledContainerCount - 1);
          const notUsedColorIdx = tempMaxColorsCount.findIndex((x) => x === 4);
          const filterColorsCount = tempMaxColorsCount.filter((x) => x === 4);
          if (filterColorsCount.length === 1) randomIdx = notUsedColorIdx;
        } while (tempMaxColorsCount[randomIdx] < 1);
        tempMaxColorsCount[randomIdx]--;
        singleColorArr[j] = AllColors[randomIdx];
      }
    } while (
      singleColorArr[0] === singleColorArr[1] &&
      singleColorArr[0] === singleColorArr[2] &&
      singleColorArr[0] === singleColorArr[3]
    );
    maxColorsCount = [...tempMaxColorsCount];
    filledColorsContainers[i] = singleColorArr;
  }
  const unfilledColorsContainer = filledContainerCount > 2 ? [[], []] : [[]];
  const finalContainers = [
    ...filledColorsContainers,
    ...unfilledColorsContainer,
  ];

  localStorage.setItem(
    "initialFinalContainers",
    JSON.stringify(finalContainers)
  );
  return finalContainers;
};
