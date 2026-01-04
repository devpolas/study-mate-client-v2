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

export default function useUpdateProfile() {
  const { fetchMe } = useAuth();
  const axiosSecure = useAxiosSecure();
  const updateProfile = useMutation({
    mutationFn: async (payload: PayloadType) => {
      await axiosSecure.patch("/users/updateMe", payload);
    },
    onSuccess: () => {
      fetchMe();
    },
  });
  return { updateProfile };
}
