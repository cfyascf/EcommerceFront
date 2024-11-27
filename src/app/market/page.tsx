"use client";

import { Menu } from "@/components/menu";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/card";

type IData = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

const Market = () => {
  const [data, setData] = useState<IData[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Chamada assíncrona dentro do useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/products", {
          method: "GET", 
          cache: "no-store",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();
        setData(Object.values(result.data));
        console.log(Object.values(result.data))

      } catch (err) {
        console.error("Failed to fetch products", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Menu showRightMenu={true} />
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap mt-6 justify-center md:w-4/5">
          {error ? (
            <div className="text-center text-red-500 font-bold">
              Failed to fetch products. Try again later.
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <ProductCard name={item.name} id={item.id} description={item.description} price={item.price}/>
            ))
          ) : (
            <div className="text-center text-gray-500 font-bold">
              No product available at the moment.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Market;
