"use client";

import { Menu } from "@/components/menu";
import { useState, useEffect } from "react";
import { SupplierCard } from "@/components/supplierCard";

type IData = {
    name: string;
    adress: string;
};

const Suppliers = () => {
    const [data, setData] = useState<IData[]>([]);
    const [error, setError] = useState<boolean>(false);

    // Chamada assíncrona dentro do useEffect
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("Token");
            try {
                const res = await fetch("http://localhost:8080/api/v1/supplier", {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch suppliers");
                }

                const result = await res.json();
                setData(Object.values(result.data));
                console.log(Object.values(result.data))

            } catch (err) {
                console.error("Failed to fetch suppliers", err);
                setError(true);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Menu showRightMenu={true} />
            <div className="w-full flex justify-center">
                <div className="text-[30px]">
                    <h1>Suppliers</h1>
                </div>
                <div className="flex flex-wrap mt-6 justify-center md:w-4/5">
                    {error ? (
                        <div className="text-center text-red-500 font-bold">
                            Failed to fetch suppliers. Try again later.
                        </div>
                    ) : data.length > 0 ? (
                        data.map((item) => (
                            <SupplierCard name={item.name} adress={item.adress} />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 font-bold">
                            No supplier available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Suppliers;
