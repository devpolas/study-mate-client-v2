import axios from "axios";

// https://study-mate-api.vercel.app/api/v1

export default function useAxiosPublic() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  return instance;
}
