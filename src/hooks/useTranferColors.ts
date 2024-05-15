import React from "react";

const useTranferColors = (
  colorContainers: string[][],
  setColorContainers: React.Dispatch<React.SetStateAction<string[][]>>,
  tranferHistoryArr: React.MutableRefObject<
    {
      sender: number;
      receiver: number;
      tranferCnt: number;
      color: string;
    }[]
  >,
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

export default useTranferColors;
