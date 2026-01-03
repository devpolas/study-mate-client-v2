import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import Logo from "../logo/Logo";
import { Link } from "react-router";

export default function Footer() {
  const date = new Date();
  return (
    <footer className='py-4 border-primary-content text-base glass-effect'>
      <div className='flex md:flex-row flex-col justify-between'>
        <div className='flex flex-col flex-1 items-center text-center'>
          <Logo />
          <p className='mt-2 font-semibold text-sm'>
            Find Mate on STUDY MATE
            <br />
            Providing service since 2025
          </p>
        </div>
        <div className='flex flex-row flex-2 justify-around'>
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

        <div className='flex-1 mt-4 md:mt-0'>
          <h1 className='mb-4 text-xl text-center md:text-start footer-title'>
            Social Links
          </h1>
          <div className='flex flex-row justify-center md:justify-normal items-center gap-3.5 font-extrabold'>
            <Link target='_blank' to='https://mail.google.com'>
              <TfiEmail className='text-xl hover:cursor-pointer' />
            </Link>
            <Link target='_blank' to='https://www.linkedin.com'>
              <FaLinkedinIn className='text-xl hover:cursor-pointer' />
            </Link>
            <Link target='_blank' to='https://www.x.com'>
              <FaXTwitter className='text-xl hover:cursor-pointer' />
            </Link>
            <Link target='_blank' to='https://www.facebook.com/'>
              <FaFacebookF className='text-xl hover:cursor-pointer' />
            </Link>
          </div>
        </div>
      </div>
      <p className='mt-4 text-xs lg:text-sm text-center'>
        Copyright STUDY MATE &copy; {date.getFullYear()}
      </p>
    </footer>
  );
}
