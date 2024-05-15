type props = {
  index: number;
  colorContainers: string[][];
  tranfercolorsFunction: (
    sender: number,
    receiver: number,
    tranferCnt: number
  ) => void;
  sender: null | number;
  setSender: React.Dispatch<React.SetStateAction<null | number>>;
};

const WaterColorContainer: React.FC<props> = ({
  index,
  colorContainers,
  tranfercolorsFunction,
  sender,
  setSender,
}) => {
  const tranferSenderToReciever = () => {
    if (sender !== null && index !== sender) {
      if (colorContainers[index].length === 4) return setSender(null);
      const senderTop = colorContainers[sender].slice(0)[0];
      const receiverTop = colorContainers[index].slice(0)[0];
      if (receiverTop && senderTop !== receiverTop) return setSender(null);
      let senderTopLen = 0;
      const receiverTopLen = 4 - colorContainers[index].length;
      while (senderTop === colorContainers[sender][senderTopLen])
        senderTopLen++;

      if (!receiverTop || senderTop === receiverTop) {
        const limitOfTransfer = Math.min(receiverTopLen, senderTopLen);
        tranfercolorsFunction(sender, index, limitOfTransfer);
        setSender(null);
      }
    } else setSender(index);
  };
  return (
    <div
      className={`border-2 border-white w-[7rem] h-[25rem] rounded-t-[2rem]  rounded-b-[20rem] flex flex-col justify-end transition-transform duration-500 max-lg:h-[20rem] max-lg:w-[6rem] max-md:h-[15rem] max-md:w-[5rem] max-sm:h-[12.5rem] max-sm:w-[4rem] ${
        sender === index ? "-translate-y-8" : ""
      }`}
      onClick={tranferSenderToReciever}
    >
      {colorContainers[index].map((color: string, idx: number) => (
        <div
          key={color + idx}
          className={`h-[5rem] max-lg:h-[4rem] max-md:h-[3rem] max-sm:h-[2.5rem] ${
            colorContainers[index].length - 1 === idx ? "rounded-b-[20rem]" : ""
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default WaterColorContainer;
