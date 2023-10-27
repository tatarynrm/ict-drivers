import { useContext, useEffect } from "react";
import socket from "../utils/socket";
import { AccoutContext } from "../components/AccountContext";
const useSocketSetup = () => {
  const { setUser } = useContext(AccoutContext);
  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};

export default useSocketSetup;
