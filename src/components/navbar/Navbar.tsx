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
import NavAuthButtons from "./nav/NavAuthButtons";
import NavUser from "./nav-user/NavUser";
import { useAuth } from "@/hooks/useAuth";
import DesktopNav from "./DesktopNav";
import type { MenuItem } from "@/types/auth";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    auth: { isAuthenticated },
  } = useAuth();

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/", icon: House },
    { name: "Participants", href: "/participants", icon: UserRoundSearch },
    {
      name: "Profile",
      href: "/profile",
      icon: SquareUserRound,
      authOnly: true,
    },
    {
      name: "Friends",
      href: "/friends",
      icon: Users,
      authOnly: true,
    },
    { name: "About", href: "/about", icon: SquaresExclude },
  ];

  const scrollThreshold = 10;

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

  const visibleMenuItems = menuItems.filter(
    (item) => !item.authOnly || isAuthenticated
  );

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
                    <MobileNav visibleMenuItems={visibleMenuItems} />
                  )}
                </AnimatePresence>

                <DesktopNav visibleMenuItems={visibleMenuItems} />
                <div className='flex flex-row gap-2'>
                  {isAuthenticated ? <NavUser /> : <NavAuthButtons />}
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
