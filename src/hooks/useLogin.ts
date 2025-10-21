import { useState } from "react";

export function useLogin() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
  };
  return {
    onLogin,
    loggedIn,
  };
}
