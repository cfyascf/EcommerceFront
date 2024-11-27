"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";
import { ROUTES } from "@/app/constants/routes";
import { Input } from "@/components/input";

export default function RegisterProduct() {
  const [productId, setProductId] = useState<string>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleEditProduct = async () => {
    if (
      !productId || Number(productId) <= 0 ||
      !name.trim() ||
      !description.trim() ||
      !price || price <= 0 ||
      !stock || stock <= 0
    ) {
      setError(true);
      return;
    }

    try {
      const token = sessionStorage.getItem("Token");
      const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
        }),
      });

      if (response.status !== 200) {
        setError(true);
        return;
      }

      const result = await response.json();
      console.log(result);

      setError(false);
      alert("Product updated successfully!");
      router.push(ROUTES.market);
    } catch (error) {
      console.error("Failed to update product:", error);
      setError(true);
    }
  };

  return (
    <>
      <Menu showRightMenu={true} />
      <div className="flex justify-center align-center mt-6 mb-6">
        <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
          <Input
            htmlFor="productId"
            label="Product ID:"
            id="productId"
            type="text"
            name="productId"
            placeholder="Product ID here..."
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <Input
            htmlFor="name"
            label="Product name:"
            id="name"
            type="text"
            name="name"
            placeholder="Product name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            htmlFor="description"
            label="Descrição:"
            id="description"
            type="text"
            name="description"
            placeholder="Digite a descrição do produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            htmlFor="price"
            label="Preço:"
            id="price"
            type="number"
            name="price"
            placeholder="Digite o preço"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Input
            htmlFor="stock"
            label="Estoque:"
            id="stock"
            type="number"
            name="stock"
            placeholder="Digite o estoque"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          {error && <div className="text-red-600 mt-2">Erro ao editar o produto!</div>}

          <button
            type="button"
            className="w-2/3 bg-pink-300 text-white rounded-md p-2 m-2"
            onClick={handleEditProduct}
          >
            Editar Produto
          </button>
        </div>
      </div>
    </>
  );
}
