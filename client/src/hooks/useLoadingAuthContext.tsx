import { LoadingAuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function useLoadingAuthContext() {
  const context = useContext(LoadingAuthContext);

  if (!context) {
    throw Error("useLoadingAuthContext problem");
  }

  return context;
}
