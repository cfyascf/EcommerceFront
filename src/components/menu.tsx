"use client";
import { ROUTES } from "@/app/constants/routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="w-full flex justify-center bg-pink-300">
      <div className="w-full h-24 md:w-4/5 p-3 flex justify-between items-center">
        <Link href={ROUTES.market}>
          <div className="flex items-center">
            <h1 className="text-white text-lg">CuteCommerce</h1>
          </div>
        </Link>
        {showRightMenu && (
          <>
            {isLoggedIn ? (
              <div className="flex items-center gap-5">
                <Link href={ROUTES.updateProduct} className="m-1">
                  <h1 className="text-white">Edit</h1>
                </Link>
                <Link href={ROUTES.cart} className="m-1">
                  <h1 className="text-white">Cart</h1>
                </Link>
                <Link href={ROUTES.registerProduct} className="m-1">
                <h1 className="text-white">Register Product</h1>
                </Link>
                <Link href={ROUTES.registerSupplier} className="m-1">
                <h1 className="text-white">Register Supplier</h1>
                </Link>
                <Link href={ROUTES.suppliers} className="m-1">
                <h1 className="text-white">Suppliers</h1>
                </Link>
                <button
                  className="w-16 bg-white text-pink-700 rounded-md p-2 m-2 hover:bg-pink-700 hover:text-white"
                  onClick={handleLogoff}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href={ROUTES.login}>
                  <button className="w-16 bg-pink-300 text-white rounded-[20px] p-2 m-2">
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
