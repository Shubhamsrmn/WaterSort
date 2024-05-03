type props = {
  index: number;
  colorContainers: string[][];
  setColorContainers: React.Dispatch<React.SetStateAction<string[][]>>;
  sender: null | number;
  setSender: React.Dispatch<React.SetStateAction<null | number>>;
};

const WaterColorContainer: React.FC<props> = ({
  index,
  colorContainers,
  setColorContainers,
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
      console.log(receiverTopLen, senderTopLen, index);

      if (!receiverTop || senderTop === receiverTop) {
        const newColorContainers = [...colorContainers];
        const limitOfTransfer =
          receiverTopLen >= senderTopLen ? senderTopLen : receiverTopLen;
        for (let idx = 0; idx < limitOfTransfer; idx++) {
          const newReceiverTop = newColorContainers[sender].shift();
          if (newReceiverTop) newColorContainers[index].unshift(newReceiverTop);
        }
        setColorContainers(newColorContainers);
        setSender(null);
      }
    } else setSender(index);
  };
  return (
    <div
      className={`border-2 border-white w-[8rem] h-[28rem] rounded-b-[20rem] flex flex-col justify-end transition-transform duration-500 ${
        sender === index ? "-translate-y-8" : ""
      }`}
      onClick={tranferSenderToReciever}
    >
      {colorContainers[index].map((color: string, idx: number) => (
        <div
          key={color + idx}
          className={`h-[6rem] ${
            colorContainers[index].length - 1 === idx ? "rounded-b-[20rem]" : ""
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default WaterColorContainer;
