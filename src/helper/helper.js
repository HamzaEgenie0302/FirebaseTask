import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export const handleLogout = (history) => {
    signOut(auth)
      .then(() => {
        history("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };