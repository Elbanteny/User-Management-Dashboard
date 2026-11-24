import { useState } from "react";

export function usePasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    toggleVisibility,
    type: isVisible ? "text" : "password",
  };
}