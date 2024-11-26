"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";
import { ROUTES } from "@/app/constants/routes";

export default function RegisterProduct() {
  const [productId, setProductId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleEditProduct = async () => {

    if (
      !productId || productId <= 0 ||
      !name.trim() ||
      !description.trim() ||
      !price || price <= 0 ||
      !stock || stock <= 0
    ) {
      setError(true);
      return;
    }

    try {
        var token = sessionStorage.getItem("Token");
        const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
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
      alert("Produto editado com sucesso!");
      router.push(ROUTES.market);
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
      setError(true);
    }
  };

  return (
    <>
      <Menu showRightMenu={true} />
      <div className="flex justify-center align-center mt-6 mb-6">
        <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
          <label htmlFor="productId" className="text-black text-medium">ID do Produto:</label>
          <input
            type="number"
            name="productId"
            placeholder="ID do Produto"
            className="p-2 text-small text-black border-2"
            value={productId || ""}
            onChange={(e) => setProductId(Number(e.target.value))}
          />

          <label htmlFor="name" className="text-black text-medium">Nome do Produto:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do produto"
            className="p-2 border-2 text-small text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description" className="text-black text-medium">Descrição:</label>
          <input
            type="text"
            name="description"
            placeholder="Digite a descrição do produto"
            className="p-2 text-small text-black border-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="price" className="text-black text-medium">Preço:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Digite o preço"
            className="p-2 text-small text-black border-2"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label htmlFor="stock" className="text-black text-medium">Estoque:</label>
          <input
            type="number"
            name="stock"
            placeholder="Digite o estoque"
            className="p-2 text-small text-black border-2"
            value={stock || ""}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          {error && <div className="text-red-600 mt-2">Erro ao editar o produto!</div>}

          <button
            type="button"
            className="bg-black mt-6 rounded-[10px] text-white p-3"
            onClick={handleEditProduct}
          >
            Editar Produto
          </button>
        </div>
      </div>
    </>
  );
}
