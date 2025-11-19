import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import NavDesktop from "./Nav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const theme = location.pathname.includes("cafeterias")
    ? "theme-cafe"
    : "theme-traiteur";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`${theme} fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 md:px-10`}
      animate={{
        paddingTop: scrolled ? "8px" : "18px",
        paddingBottom: scrolled ? "8px" : "18px",
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.7)"
          : "rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
      }}
      transition={{ duration: 0.25 }}
    >
      {/* LEFT — LOGO */}
      <div className="flex items-center justify-between gap-70">
        <button
          className="md:hidden text-2xl"
          style={{ color: "var(--color-text)" }}
        >
          <FiMenu />
        </button>
        <div className="flex flex-col items-center  gap-2">
          <img
            src="/images/logo.png"
            alt="Food Ynvést Logo"
            className="h-10 w-auto object-contain rounded-sm"
          />

          <span className="text-sm font-extrabold tracking-wider hidden md:block text-primary ">
            FOOD YNVEST
          </span>
        </div>
      </div>

      {/* RIGHT — NAV DESKTOP */}
      <NavDesktop />
    </motion.header>
  );
};

export default Header;
