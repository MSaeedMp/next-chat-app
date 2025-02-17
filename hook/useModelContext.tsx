import { ModelContext } from "@/context/ModelContext";
import { useContext } from "react";

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
};
