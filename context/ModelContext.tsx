import { ModelType } from "@/utils/types";
import { createContext, useState } from "react";

type ModelContextType = {
  model: ModelType;
  setModel: React.Dispatch<React.SetStateAction<ModelType>>;
};

const defaultModel = "llama3-70b-8192";
export const ModelContext = createContext<ModelContextType | null>(null);

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [model, setModel] = useState<ModelType>(defaultModel);

  const value = {
    model,
    setModel,
  };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};
