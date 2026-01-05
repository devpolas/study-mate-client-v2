import useAxiosSecure from "./useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFriendShipActions(userId?: string) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["participant"] });
    queryClient.invalidateQueries({ queryKey: ["friends", userId] });
    queryClient.invalidateQueries({ queryKey: ["friendRequests", userId] });
  };

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
    onSuccess: () => invalidateAll(),
  });

  const acceptFriendRequest = useMutation({
    mutationFn: async (requesterId: string) =>
      await axiosSecure.post("/friendships/accept-request", { requesterId }),
    onSuccess: () => invalidateAll(),
  });

  const deleteRequest = useMutation({
    mutationFn: async (recipientId: string) =>
      await axiosSecure.post("/friendships/delete-request", { recipientId }),
    onSuccess: () => invalidateAll(),
  });

  const unfriend = useMutation({
    mutationFn: async (recipientId: string) =>
      await axiosSecure.post("/friendships/unfriend", { recipientId }),
    onSuccess: () => invalidateAll(),
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
