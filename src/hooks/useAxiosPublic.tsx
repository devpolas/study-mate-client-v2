import axios from "axios";

// https://study-mate-api.vercel.app/api/v1

export default function useAxiosPublic() {
  const instance = axios.create({
    baseURL: "https://study-mate-api.vercel.app/api/v1",
  });
  return instance;
}
