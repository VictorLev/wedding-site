"use client";
import Link from "next/link";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { FC, useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Logo from "@/src/public/images/Wedding_Logo.png";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.startsWith("/#");
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Place", href: "#place" },
    { name: "Ceremony", href: "#ceremony" },
    { name: "Reception", href: "#reception" },
    { name: "Accommodations", href: "#accommodations" },
    { name: "Gifts", href: "#gifts" },
  ];

  // Delay visibility on homepage
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHomePage) {
      timer = setTimeout(() => setIsVisible(true), 500);
    } else {
      setIsVisible(true);
    }
    return () => clearTimeout(timer);
  }, [isHomePage]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    console.log("Route changed to:", pathname);
    setActiveSection(""); // Reset when changing pages

    if (!isHomePage) {
      return; // Only run observer on homepage
    }

    const sections = document.querySelectorAll("section");
    if (sections.length === 0) {
      console.warn("No sections found for IntersectionObserver.");
      return;
    }

    const observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observerRef.observe(section));

    return () => {
      observerRef.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className={`sticky top-0 z-10 mx-auto p-1 bg-darkBlue ${
        isHomePage
          ? isVisible
            ? "transition-opacity duration-[1500ms] opacity-100"
            : "opacity-0"
          : "opacity-100"
      }`}
    >
      <Container>
        <div className="flex flex-row justify-between w-full px-1 h-14">
          <Image
            className="object-contain sm:object-cover"
            width={50}
            priority
            src={Logo}
            alt="Wedding Logo"
          />
          <div className="flex justify-center items-center gap-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className={`link-container text-darkBeige text-xl ${
                  activeSection === item.href.substring(1)
                    ? "font-bold"
                    : "font-normal"
                }`}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center gap-x-6">
            <Link href="/faq" className="">
              <p className="link-container text-darkBeige text-xl">
                {t("Faq")}
              </p>
            </Link>
            <Link href="/rsvp">
              <Button>{t("Rsvp")}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;