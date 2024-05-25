import { motion } from "framer-motion";
import SenderColorRemover from "./SenderColorRemover";
import { getReceiverAnimationObj } from "../utils/getReceiverAnimationObj";
import { checkIsCompletedSingleSort } from "../utils/checkIsCompletedSort";
import { useColorsContainersContext } from "../context/ColorContainersContext";
import WaterColorContainerCompleted from "./WaterColorContainerCompleted";

type props = {
  index: number;
  lastTranfer: {
    sender: number;
    receiver: number;
    tranferCnt: number;
    color: string;
  } | null;
};

const WaterColorContainer: React.FC<props> = ({ index, lastTranfer }) => {
  const { sender, setSender, colorContainers, tranfercolorsFunction } =
    useColorsContainersContext();
  const isComplete = colorContainers[index][0]
    ? checkIsCompletedSingleSort(colorContainers[index])
    : true;
  const tranferSenderToReciever = () => {
    if (!isComplete) return;
    if (sender !== null) {
      if (sender === index) return setSender(null);
      if (
        colorContainers[index].length === 4 ||
        colorContainers[sender].length === 0
      )
        return setSender(null);
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
  const topColor = colorContainers[index][0];
  return (
    <div className="relative">
      {!isComplete && <WaterColorContainerCompleted color={topColor} />}
      <motion.div
        className={`w-[6rem] h-[20rem] rounded-t-[2rem] rounded-b-[20rem] flex flex-col justify-end transition-all duration-1000 max-lg:h-[15rem] max-lg:w-[5rem] max-md:h-[12.5rem] max-md:w-[4rem] max-sm:h-[10rem] max-sm:w-[3rem] border-2 border-gray-500 overflow-hidden cursor-grab ${
          sender === index ? "-translate-y-8" : ""
        }`}
        onClick={tranferSenderToReciever}
      >
        {lastTranfer && lastTranfer.sender === index && (
          <SenderColorRemover lastTranfer={lastTranfer} />
        )}

        {colorContainers[index].map((color: string, idx: number) => (
          <div
            key={color + idx}
            className={`h-[4rem] max-lg:h-[3rem] max-md:h-[2.5rem] max-sm:h-[2rem]`}
          >
            <motion.div
              {...getReceiverAnimationObj(
                (lastTranfer &&
                  lastTranfer.receiver === index &&
                  idx < lastTranfer.tranferCnt) ||
                  false,
                lastTranfer ? (lastTranfer.tranferCnt - 1 - idx) * 0.5 : 0
              )}
              style={{
                backgroundColor: color,
                transformOrigin: "bottom",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WaterColorContainer;
