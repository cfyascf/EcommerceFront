"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants/routes";
import { Menu } from "@/components/menu";
import { Input } from "@/components/input";

export default function RegisterProduct() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [stock_qty, setStock_qty] = useState<number | undefined>();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleNewProduct = async () => {
    // Verificação dos campos obrigatórios
    if (!name || !description || !price || price <= 0 || !stock_qty || stock_qty <= 0) {
      setError(true);
      return;
    }

    try {
      var token = sessionStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, price, stock_qty }),
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      const result = await response.json();
      console.log(result);

      setError(false);
      alert("Produto cadastrado com sucesso!");
      router.push(ROUTES.market);
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
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
            label="Product Name:"
            type="text"
            id="name"
            name="name"
            placeholder="Type product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            htmlFor="description"
            label="Product Description:"
            type="text"
            id="description"
            name="description"
            placeholder="Type product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            htmlFor="price"
            label="Price:"
            type="text"
            id="price"
            name="price"
            placeholder="Type price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            htmlFor="stock_qty"
            label="Stock quantity:"
            type="text"
            id="stock_qty"
            name="stock_qty"
            placeholder="Type stock quantity..."
            value={stock_qty}
            onChange={(e) => setStock_qty(e.target.value)}
          />

          {error && (
            <div className="text-red-600 mt-2">
              Failed to register product! Check the fields.
            </div>
          )}

          <button
            type="button"
            className="w-3/3 bg-pink-300 text-white rounded-md p-2 m-2"
            onClick={handleNewProduct}
          >
            Register new product
          </button>
        </div>
      </div>
    </>
  );
}
