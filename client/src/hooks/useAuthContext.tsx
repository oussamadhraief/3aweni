import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext problem");
  }

  return context;
}
