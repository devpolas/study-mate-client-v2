import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className='pt-16 pb-4 w-full min-h-[calc(100vh-170px)]'>
        <div className='mx-auto max-w-11/12 h-full'>
          <Outlet />
        </div>
      </main>
      <footer className='border-t'>
        <div className='mx-auto max-w-11/12'>
          <Footer />
        </div>
      </footer>
    </div>
  );
}
