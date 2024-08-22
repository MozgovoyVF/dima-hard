import { useEffect } from "react";

export const useVH = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    // let vh = window.innerHeight * 0.01;
    // console.log("change VH");
    // document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      document.removeEventListener("resize", appHeight);
    };
  }, []);
};
