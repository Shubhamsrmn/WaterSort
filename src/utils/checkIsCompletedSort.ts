export const checkIsCompletedSort = (colorContainers: string[][]): boolean => {
  if (!colorContainers) return false;
  let isCompleted = true;
  for (let i = 0; i < colorContainers.length; i++) {
    if (checkIsCompletedSingleSort(colorContainers[i])) {
      isCompleted = false;
      break;
    }
  }
  return isCompleted;
};
export const checkIsCompletedSingleSort = (
  colorContainer: string[]
): boolean => {
  return (
    colorContainer[0] !== colorContainer[1] ||
    colorContainer[0] !== colorContainer[2] ||
    colorContainer[0] !== colorContainer[3]
  );
};
