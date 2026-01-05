import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

type PayloadType = {
  name?: string;
  subject?: string;
  studyMode?: boolean;
  availability?: string;
  experienceLevel?: string;
  location?: string;
};

interface PasswordType {
  password: string;
  passwordConfirm: string;
}

export default function useUpdateProfile() {
  const { fetchMe, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const updateProfile = useMutation({
    mutationFn: async (payload: PayloadType) => {
      await axiosSecure.patch("/users/updateMe", payload);
    },
    onSuccess: () => {
      fetchMe();
    },
  });
  const updatePassword = useMutation({
    mutationFn: async (payload: PasswordType) => {
      const res = await axiosSecure.patch("/users/updatePassword", payload);
      return res.data;
    },
    onSuccess: () => {
      logout();
    },
  });
  return { updateProfile, updatePassword };
}
