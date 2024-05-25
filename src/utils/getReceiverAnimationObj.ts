export const getReceiverAnimationObj = (
  isTransfer: boolean,
  animationDelay: number
) => {
  const receiverCellAnimation = isTransfer
    ? {
        initial: {
          scaleX: 1,
          scaleY: 0,
          width: "100%",
          height: "100%",
        },
        animate: {
          scaleX: 1,
          scaleY: 1,
          width: "100%",
          height: "100%",
        },
        transition: {
          duration: 0.5,
          delay: animationDelay,
        },
      }
    : {
        initial: {
          width: "100%",
          height: "100%",
        },
      };
  return receiverCellAnimation;
};
