import { useEffect } from "react";

const usePreventScrollWhenKeyboardOpen = () => {
  useEffect(() => {
    let keyboardOpen = false;

    const handleFocus = () => {
      keyboardOpen = true;
      document.body.style.overflow = "hidden"; // Disable scrolling
    };

    const handleBlur = () => {
      keyboardOpen = false;
      document.body.style.overflow = ""; // Enable scrolling
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (keyboardOpen) {
        e.preventDefault(); // Prevent touch move when keyboard is open
      }
    };

    window.addEventListener("resize", () => {
      // Check window height to detect if keyboard is open (based on window height reduction)
      if (window.innerHeight < document.documentElement.clientHeight) {
        keyboardOpen = true;
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        keyboardOpen = false;
        document.body.style.overflow = ""; // Enable scrolling
      }
    });

    document.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
    });

    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.querySelectorAll("input, textarea").forEach((el) => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      });
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default usePreventScrollWhenKeyboardOpen;
