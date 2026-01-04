import { AxiosError } from "axios";
import useAxiosSecure from "./useAxiosSecure";

export default function useFriendShipActions() {
  const axiosSecure = useAxiosSecure();

  const handleAxiosError = (err: unknown) => {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || "Authentication failed");
    }
    throw new Error("An unexpected error occurred");
  };

  const getAllFriend = async (id: string) => {
    try {
      const res = await axiosSecure.get(`/friendships/all-friends/${id}`);
      return res.data;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const getAllFriendRequest = async (id: string) => {
    try {
      const res = await axiosSecure.get(
        `/friendships/all-requested-friends/${id}`
      );
      return res.data;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const sendFriendRequest = async (recipient: string) => {
    try {
      await axiosSecure.post(`/friendships/send-request`, {
        recipientId: recipient,
      });
      return true;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const acceptFriendRequest = async (recipient: string) => {
    try {
      await axiosSecure.post(`/friendships/accept-request`, {
        requesterId: recipient,
      });
      return true;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const unfriend = async (recipient: string) => {
    try {
      await axiosSecure.post(`/friendships/unfriend`, {
        recipientId: recipient,
      });
      return true;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const deleteRequest = async (recipient: string) => {
    try {
      await axiosSecure.post(`/friendships/delete-request`, {
        recipientId: recipient,
      });
      return true;
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return {
    allFriend: getAllFriend,
    allFriendRequest: getAllFriendRequest,
    send: sendFriendRequest,
    accept: acceptFriendRequest,
    deleteReq: deleteRequest,
    unfriend,
  };
}
