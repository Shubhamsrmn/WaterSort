import React, { createContext, useContext, useRef, useState } from "react";
import { generateInitialColorsContainers } from "../utils/generateInitialColorsContainers";
import { getRandomNumber } from "../utils/getRandomNumber";

interface ContainersContextType {
  sender: number | null;
  setSender: React.Dispatch<React.SetStateAction<number | null>>;
  colorContainers: string[][];
  setColorContainers: React.Dispatch<React.SetStateAction<string[][]>>;
  tranferHistoryArr: React.MutableRefObject<
    {
      sender: number;
      receiver: number;
      tranferCnt: number;
      color: string;
    }[]
  >;
  tranfercolorsFunction: (
    sender: number,
    receiver: number,
    tranferCnt: number,
    storeHistory?: boolean
  ) => void;
}

const ContainersContext = createContext<ContainersContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ColorContainersProvider: React.FC<Props> = ({ children }) => {
  const [sender, setSender] = useState<number | null>(null);
  const [colorContainers, setColorContainers] = useState<string[][]>(
    generateInitialColorsContainers(getRandomNumber(2, 5), true)
  );
  const tranferHistoryArr = useRef<
    {
      sender: number;
      receiver: number;
      tranferCnt: number;
      color: string;
    }[]
  >(JSON.parse(localStorage.getItem("tranferHistoryArr") || "[]"));
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
      "tranferHistoryArr",
      JSON.stringify(tranferHistoryArr.current)
    );
    localStorage.setItem(
      "recentTranferContainers",
      JSON.stringify(newColorContainers)
    );
    setColorContainers(newColorContainers);
  };
  const contextValue: ContainersContextType = {
    sender,
    setSender,
    colorContainers,
    setColorContainers,
    tranferHistoryArr,
    tranfercolorsFunction,
  };

  return (
    <ContainersContext.Provider value={contextValue}>
      {children}
    </ContainersContext.Provider>
  );
};

const useColorsContainersContext = () => {
  const context = useContext(ContainersContext);
  if (context === null) {
    throw new Error(
      "useColorsContainersContext must be used within a ColorContainersProvider"
    );
  }
  return context;
};

export { useColorsContainersContext, ColorContainersProvider };
