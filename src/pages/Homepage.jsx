import { useLoaderData } from "react-router";
import HeroSection from "../components/HeroSection.jsx";
import Reviews from "../components/Reviews.jsx";
import TopMates from "../components/TopMates.jsx";
import ImageSlider from "./../components/ImageSlider.jsx";
export default function Homepage() {
  const data = useLoaderData();
  const allUsrData = data.data.users;
  return (
    <div>
      <ImageSlider />
      <HeroSection />
      <TopMates data={allUsrData} />
      <Reviews />
    </div>
  );
}
