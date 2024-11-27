"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants/routes";
import { Menu } from "@/components/menu";
import { Input } from "@/components/input";

export default function RegisterSupplier() {
  const [name, setName] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleNewSupplier = async () => {
    if (!name || !adress) {
      setError(true);
      return;
    }

    try {
      var token = sessionStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/api/v1/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, adress }),
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      const result = await response.json();
      console.log(result);

      setError(false);
      alert("Supplier registered successfully!");
      router.push(ROUTES.market);
    } catch (err) {
      console.error("Failed to register supplier:", err);
      setError(true);
    }
  };

  return (
    <>
      <Menu showRightMenu={true} />
      <div className="flex justify-center align-center mt-6 mb-6">
        <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">

          <Input
            htmlFor="name"
            label="Supplier Name:"
            type="text"
            id="name"
            name="name"
            placeholder="Type supplier name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            htmlFor="adress"
            label="Supplier Adress:"
            type="text"
            id="adress"
            name="adress"
            placeholder="Type supplier adress..."
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />

          {error && (
            <div className="text-red-600 mt-2">
              Failed to register supplier! Check the fields.
            </div>
          )}

          <button
            type="button"
            className="w-3/3 bg-pink-300 text-white rounded-md p-2 m-2"
            onClick={handleNewSupplier}
          >
            Register new supplier
          </button>
        </div>
      </div>
    </>
  );
}
