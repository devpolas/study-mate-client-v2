import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const isPending = false;
  return (
    <div className='px-4 sm:px-6 md:px-16'>
      <Navbar />
      <div className='min-h-[75vh] pb-4'>
        {isPending ? (
          <div className='skeleton h-[75vh] w-full'></div>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
}
