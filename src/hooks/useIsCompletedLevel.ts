import React, { useEffect } from "react";
import { checkIsCompletedSort } from "../utils/checkIsCompletedSort";

const useIsCompletedLevel = (
  colorContainers: string[][],
  setShowCompletedLevel: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const isCompleted = checkIsCompletedSort(colorContainers);
    if (isCompleted) {
      const timeout = setTimeout(() => {
        setShowCompletedLevel(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [colorContainers, setShowCompletedLevel]);
};

export default useIsCompletedLevel;
