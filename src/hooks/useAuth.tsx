import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { logOut } from "@/store/authSlice";
import {
  getUser,
  signinUser,
  signupUser,
  socialLoginUser,
} from "@/store/thunks";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    auth,
    login: (email: string, password: string) =>
      dispatch(signinUser({ email, password })),
    signup: (
      name: string,
      email: string,
      password: string,
      passwordConfirm: string,
      birthdate: string
    ) =>
      dispatch(
        signupUser({ name, email, password, passwordConfirm, birthdate })
      ),
    socialLogin: (token: string) =>
      dispatch(socialLoginUser({ googleAuthToken: token })),
    fetchMe: () => auth.token && dispatch(getUser(auth.token)),
    logout: () => dispatch(logOut()),
  };
};
