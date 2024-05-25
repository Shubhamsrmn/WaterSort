import React from "react";
import { motion } from "framer-motion";
type props = {
  lastTranfer: {
    sender: number;
    receiver: number;
    tranferCnt: number;
    color: string;
  };
};
const SenderColorRemover: React.FC<props> = ({ lastTranfer }) => {
  return Array.from(
    { length: lastTranfer.tranferCnt },
    () => lastTranfer.color
  ).map((color, idx) => (
    <div
      key={color + idx}
      className={`h-[4rem] max-lg:h-[3rem] max-md:h-[2.5rem] max-sm:h-[2rem]`}
    >
      <motion.div
        initial={{
          scaleX: 1,
          scaleY: 1,
          width: "100%",
          height: "100%",
        }}
        animate={{
          scaleX: 1,
          scaleY: 0,
          width: "100%",
          height: "100%",
        }}
        transition={{
          duration: 0.5,
          delay: idx * 0.5,
        }}
        style={{
          backgroundColor: color,
          transformOrigin: "bottom",
        }}
      />
    </div>
  ));
};

export default SenderColorRemover;
