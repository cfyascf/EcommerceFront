"use client";
import { ROUTES } from "@/app/constants/routes";
import { useRouter } from "next/navigation";

export const BuyButton = ({ productId }: { productId: string }) => {
  const router = useRouter();

  const handleBuy = async () => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      return router.push(ROUTES.login);
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/add/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 401) {
        return router.push(ROUTES.login);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="w-2/3 bg-black text-white rounded-[20px] p-2 m-2"
      onClick={handleBuy}
    >
      Buy
    </button>
  );
};
