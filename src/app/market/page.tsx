"use client";

import Image from "next/image";
import templete from "@/img/Acer_Wallpaper_03_3840x2400.jpg";
import { BuyButton } from "@/components/buy";
import { Menu } from "@/components/menu";
import { useState, useEffect } from "react";

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
        setData(result.data);
        console.log(result)
        console.log(result.data)

      } catch (err) {
        console.error("Failed to fetch products", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data.length)
  }, [data])

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
              <div key={item.id} className="p-1">
                <div className="shadow-lg m-2 rounded-[20px]">
                  <div>
                    <Image
                      src={templete}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="object-cover w-[300px] h-[300px] rounded-t-[15px]"
                      priority={true}
                    />
                  </div>
                  <div className="p-1">
                    <div className="flex justify-center font-bold">{item.name}</div>
                    <div className="flex justify-center">
                      <p className="flex items-center text-center p-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <p className="flex items-center font-semibold text-center p-1">
                        R${item.price}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <BuyButton productId={item.id.toString()} />
                    </div>
                  </div>
                </div>
              </div>
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
