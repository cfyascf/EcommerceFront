"use client";
import { ROUTES } from "@/app/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import logo from "@/img/growth.png";
import cartIcon from "@/img/shopping-cart (1).png";
import addIcon from "@/img/mais.png";
import editIcon from "@/img/lapis.png";

export const Menu = ({ showRightMenu }: { showRightMenu: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const handleLogoff = () => {
    sessionStorage.setItem("Token", "");
    setIsLoggedIn(false);
    router.push(ROUTES.market);
  };

  useEffect(() => {
    var token = sessionStorage.getItem("Token");
    if(token == null || token == "") {
        setIsLoggedIn(false);
        return;
    }

    setIsLoggedIn(true);
  })

  return (
    <div className="w-full flex justify-center bg-black">
      <div className="w-full h-24 md:w-4/5 p-3 flex justify-between items-center">
        <Link href={ROUTES.market}>
          <div className="flex items-center">
            <Image src={logo} alt="Logo" className="h-12 w-auto" priority />
            <h1 className="text-white text-[30px]">Store 1</h1>
          </div>
        </Link>
        {showRightMenu && (
          <>
            {isLoggedIn ? (
              <div className="flex items-center">
                <Link href={ROUTES.updateProduct} className="m-1">
                  <Image src={editIcon} alt="Edit" className="h-10 w-auto" priority />
                </Link>
                <Link href={ROUTES.cart} className="m-1">
                  <Image src={cartIcon} alt="Cart" className="h-10 w-auto" priority />
                </Link>
                <Link href={ROUTES.registerProduct} className="m-1">
                  <Image src={addIcon} alt="Add" className="h-10 w-auto" priority />
                </Link>
                <button
                  className="w-16 bg-white text-black rounded-[20px] p-2 m-2"
                  onClick={handleLogoff}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href={ROUTES.login}>
                  <button className="w-16 bg-white text-black rounded-[20px] p-2 m-2">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
