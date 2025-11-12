import HeroSection from "../components/HeroSection.jsx";
import Reviews from "../components/Reviews.jsx";
import TopMates from "../components/TopMates.jsx";
import ImageSlider from "./../components/ImageSlider.jsx";
export default function Homepage() {
  return (
    <div>
      <ImageSlider />
      <HeroSection />
      <TopMates />
      <Reviews />
    </div>
  );
}
