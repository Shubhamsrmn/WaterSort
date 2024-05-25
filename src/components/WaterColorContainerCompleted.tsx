import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import woodenBackground from "../../public/aditya-joshi-wG923J9naFQ-unsplash.jpg";
type props = {
  color: string;
};
const WaterColorContainerCompleted: React.FC<props> = ({ color }) => {
  return (
    <>
      <div className="w-full absolute top-0 left-0 flex justify-between">
        <motion.div
          initial={{ y: 0, scale: 1, opacity: 0 }}
          animate={{
            y: -60,
            scale: 1.4,
            opacity: 1,
            transitionEnd: { opacity: 0 },
          }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FontAwesomeIcon icon={faStar} color={color} size="lg" />
        </motion.div>

        <motion.div
          initial={{ y: -10, scale: 1, opacity: 0 }}
          animate={{
            y: -90,
            scale: 1.6,
            opacity: 1,
            transitionEnd: { opacity: 0 },
          }}
          transition={{ duration: 2, delay: 1 }}
        >
          <FontAwesomeIcon icon={faStar} color={color} size="lg" />
        </motion.div>
        <motion.div
          initial={{ y: -20, scale: 1, opacity: 0 }}
          animate={{
            y: -70,
            scale: 1.2,
            opacity: 1,
            transitionEnd: { opacity: 0 },
          }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <FontAwesomeIcon icon={faStar} color={color} size="lg" />
        </motion.div>
      </div>

      <div className="w-[130%] absolute top-0 left-[50%] -translate-x-2/4">
        <img
          src={woodenBackground}
          alt="wooden bottle cap"
          className="w-full h-6 bg-cover rounded-full"
        />
      </div>
    </>
  );
};

export default WaterColorContainerCompleted;
