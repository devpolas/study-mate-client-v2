import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className='pt-16 pb-4'>
        <div className='mx-auto max-w-11/12'>
          <Outlet />
        </div>
      </main>
      <footer className='mx-auto max-w-11/12'>footer</footer>
    </div>
  );
}
