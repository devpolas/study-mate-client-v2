import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import Logo from "./../components/ui/Logo";

export default function Footer() {
  const date = new Date();
  return (
    <footer className='py-4 text-base shadow'>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col text-center items-center flex-1'>
          <Logo />
          <p className='font-semibold text-sm mt-2'>
            Find Mate on STUDY MATE
            <br />
            Providing service since 2025
          </p>
        </div>
        <div className='flex flex-row justify-around  flex-2'>
          <nav className='flex flex-col mt-8 md:mt-0'>
            <h6 className='footer-title'>Mate Services</h6>
            <a className='link link-hover'>Career</a>
            <a className='link link-hover'>Books</a>
            <a className='link link-hover'>Solutions</a>
          </nav>
          <nav className='flex flex-col mt-8 md:mt-0'>
            <h6 className='footer-title'>Company</h6>
            <a className='link link-hover'>About us</a>
            <a className='link link-hover'>Contact</a>
            <a className='link link-hover'>Location</a>
          </nav>
        </div>

        <div className='flex-1 mt-10 md:mt-0'>
          <h1 className='text-xl text-center md:text-start footer-title mb-4'>
            Social Links
          </h1>
          <div className='flex flex-row gap-3.5 justify-center md:justify-normal items-center font-extrabold'>
            <a target='_blank' href='https://mail.google.com'>
              <TfiEmail className='hover:cursor-pointer text-xl' />
            </a>
            <a target='_blank' href='https://www.linkedin.com'>
              <FaLinkedinIn className='hover:cursor-pointer text-xl' />
            </a>
            <a target='_blank' href='https://www.x.com'>
              <FaXTwitter className='hover:cursor-pointer text-xl' />
            </a>
            <a target='_blank' href='https://www.facebook.com/'>
              <FaFacebookF className='hover:cursor-pointer text-xl' />
            </a>
          </div>
        </div>
      </div>
      <p className='text-center text-sm mt-4'>
        Copyright STUDY MATE &copy; {date.getFullYear()} - All right reserved
      </p>
    </footer>
  );
}
