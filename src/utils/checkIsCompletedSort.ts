export const checkIsCompletedSort = (colorContainers: string[][]) => {
  let isCompleted = true;
  for (let i = 0; i < colorContainers.length; i++) {
    if (
      colorContainers[i][0] !== colorContainers[i][1] ||
      colorContainers[i][0] !== colorContainers[i][2] ||
      colorContainers[i][0] !== colorContainers[i][3]
    ) {
      isCompleted = false;
      break;
    }
  }
  return isCompleted;
};
