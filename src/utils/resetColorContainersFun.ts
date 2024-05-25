import React from "react";

export const resetColorContainersFun = (
  tranferHistoryArr: React.MutableRefObject<
    {
      sender: number;
      receiver: number;
      tranferCnt: number;
      color: string;
    }[]
  >,
  setSender: React.Dispatch<React.SetStateAction<number | null>>,
  setColorContainers: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const colorsContainersStr = localStorage.getItem("newInitialContainers");
  if (!colorsContainersStr) return;
  const newColorContainers = JSON.parse(colorsContainersStr);
  localStorage.setItem(
    "recentTranferContainers",
    JSON.stringify(newColorContainers)
  );
  tranferHistoryArr.current = [];
  localStorage.setItem(
    "tranferHistoryArr",
    JSON.stringify(tranferHistoryArr.current)
  );
  setSender(null);
  setColorContainers(newColorContainers);
};
