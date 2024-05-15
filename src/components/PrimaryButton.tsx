import React from "react";
type props = {
  onClickHandler: () => void;
  children: React.ReactNode;
  disabled: boolean;
  buttonStyle?: string;
};
const PrimaryButton: React.FC<props> = ({
  onClickHandler,
  children,
  disabled,
  buttonStyle,
}) => {
  return (
    <button
      className={`w-[3.2rem] h-[3.2rem] bg-[#FAF6F0] border rounded-full ${
        disabled && "cursor-not-allowed opacity-70"
      } ${buttonStyle}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
