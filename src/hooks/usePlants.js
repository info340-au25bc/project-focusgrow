import { useContext } from "react";
import { PlantContext } from "../context/PlantContext";

export function usePlants() {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlants must be used within PlantProvider");
  }
  return context;
}
