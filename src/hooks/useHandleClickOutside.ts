import { useEffect } from "react";

const useHandleClickOutside = (outsideClickHandler: () => void) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const waterColorContainerClass = "water-color-container";

      let clickedElement = event.target as HTMLElement | null;
      let isInsideContainer = false;

      while (clickedElement) {
        if (
          clickedElement.classList &&
          clickedElement.classList.contains(waterColorContainerClass)
        ) {
          isInsideContainer = true;
          break;
        }
        clickedElement = clickedElement.parentElement;
      }

      if (!isInsideContainer) {
        outsideClickHandler();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [outsideClickHandler]);
};

export default useHandleClickOutside;
