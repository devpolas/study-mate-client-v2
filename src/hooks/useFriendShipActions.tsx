import useAxiosSecure from "./useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFriendShipActions() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const allFriend = async (id: string) => {
    const res = await axiosSecure.get(`/friendships/all-friends/${id}`);
    return res.data?.data || [];
  };

  const allFriendRequest = async (id: string) => {
    const res = await axiosSecure.get(
      `/friendships/all-requested-friends/${id}`
    );
    return res.data?.data || [];
  };

  const sendFriendRequest = useMutation({
    mutationFn: async (recipientId: string) =>
      await axiosSecure.post("/friendships/send-request", { recipientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const acceptFriendRequest = useMutation({
    mutationFn: async (requesterId: string) =>
      await axiosSecure.post("/friendships/accept-request", { requesterId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const deleteRequest = useMutation({
    mutationFn: async (recipientId: string) =>
      await axiosSecure.post("/friendships/delete-request", { recipientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const unfriend = useMutation({
    mutationFn: async (recipientId: string) =>
      await axiosSecure.post("/friendships/unfriend", { recipientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return {
    allFriend,
    allFriendRequest,
    sendFriendRequest,
    acceptFriendRequest,
    deleteRequest,
    unfriend,
  };
}
