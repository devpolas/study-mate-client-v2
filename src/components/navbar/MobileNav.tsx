import { motion } from "motion/react";
import DefaultNavLink from "./nav/DefaultNavLink";
import type { MenuItem } from "@/types/auth";
import NavAuthButtons from "./nav/NavAuthButtons";
import LoginWithGoogle from "../button/social/LoginWithGoogle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export default function MobileNav({
  visibleMenuItems,
}: {
  visibleMenuItems: MenuItem[];
}) {
  const {
    auth: { isAuthenticated },
    logout,
  } = useAuth();
  return (
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
      <hr />
      {isAuthenticated ? (
        <div className='flex justify-center items-center -mt-2'>
          <Button
            className='w-full'
            size='sm'
            variant='destructive'
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center gap-2 -mt-2'>
          <NavAuthButtons />
          <LoginWithGoogle />
        </div>
      )}
    </motion.div>
  );
}
