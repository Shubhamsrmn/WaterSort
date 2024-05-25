export const previousTranferhandlerFun = (
  lastTranfer: {
    sender: number;
    receiver: number;
    tranferCnt: number;
    color: string;
  },
  tranfercolorsFunction: (
    sender: number,
    receiver: number,
    tranferCnt: number,
    storeHistory?: boolean
  ) => void,
  setSender: React.Dispatch<React.SetStateAction<number | null>>
) => {
  tranfercolorsFunction(
    lastTranfer.receiver,
    lastTranfer.sender,
    lastTranfer.tranferCnt,
    false
  );
  setSender(null);
};
