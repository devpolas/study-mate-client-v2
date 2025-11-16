import { createContext } from "react";

const AuthContext = createContext({
  signup: () => {},
  login: () => {},
  socialLogin: () => {},
  logout: () => {},
  authUser: null,
  token: "",
  isLoading: false,
  isSubmitting: false,
  setIsSubmitting: () => {},
  isError: "",
  setIsError: () => {},
});

export default AuthContext;
