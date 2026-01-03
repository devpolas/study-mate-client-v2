import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  House,
  SquareUserRound,
  Users,
  UserRoundSearch,
  SquaresExclude,
} from "lucide-react";
import Logo from "../logo/Logo";
import ThemeToggle from "../theme/ThemeToggle";
import NavAuthButtons from "../button/nav/NavAuthButtons";
import NavUser from "../nav-user/NavUser";
import DefaultNavLink from "../button/nav/DefaultNavLink";

export default function Navbar() {
  const auth = false;

  const menuItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Participants", href: "/participants", icon: UserRoundSearch },
    {
      name: "Profile",
      href: "/profile",
      icon: SquareUserRound,
      authOnly: true,
    },
    { name: "Friends", href: "/friends", icon: Users, authOnly: true },
    { name: "About", href: "/about", icon: SquaresExclude },
  ];

  // Only show items the user is allowed to see
  const visibleMenuItems = menuItems.filter((item) => !item.authOnly || auth);

  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY.current;

    if (scrollDifference > scrollThreshold && currentScrollY > 100) {
      setShow(false);
    } else if (scrollDifference < -scrollThreshold || currentScrollY < 100) {
      setShow(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <div className='top-0 left-0 z-50 fixed shadow-xs backdrop-blur-xs border-accent border-b w-full'>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.6 }}
          >
            <div className='mx-auto py-3 max-w-11/12'>
              <div className='flex justify-between items-center font-semibold text-lg'>
                <div className='flex flex-row items-center gap-1'>
                  <div
                    onClick={() => setMobileMenuOpen((pre) => !pre)}
                    className='lg:hidden'
                  >
                    <AnimatePresence mode='wait'>
                      {isMobileMenuOpen ? (
                        <motion.div
                          key='close'
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.1 }}
                        >
                          <X />
                        </motion.div>
                      ) : (
                        <motion.div
                          key='menu'
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Menu />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Logo />
                </div>

                <AnimatePresence mode='wait'>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='top-15 absolute flex flex-col gap-4 bg-background backdrop-blur-md px-10 py-4 border border-accent rounded-md'
                    >
                      {visibleMenuItems.map((item) => (
                        <DefaultNavLink
                          key={item.href}
                          href={item.href}
                          label={item.name}
                          icon={item.icon}
                          iconSize={16}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className='hidden lg:flex flex-row gap-4 lg:gap-8 xl:gap-10 text-lg'>
                  {visibleMenuItems.map((item) => (
                    <DefaultNavLink
                      key={item.href}
                      href={item.href}
                      label={item.name}
                      icon={item.icon}
                      iconSize={16}
                    />
                  ))}
                </div>
                <div className='flex flex-row gap-2'>
                  {auth ? <NavUser /> : <NavAuthButtons />}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
