'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";
import Image from "next/image";

import cat from '@/img/cat.jpg';
import { Menu } from "@/components/menu";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_qty: number;
}

interface IData {
    values: {
        id: number;
        total_price: number;
        userId: number;
    };
    products: Product[];
}

const Cart = () => {
    const router = useRouter();
    const [data, setData] = useState<IData | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem("Token");

        if (!token) {
            router.push(ROUTES.login);
            return;
        }

        const loadCartData = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/v1/cart", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (res.status === 401) {
                    router.push(ROUTES.login);
                }

                if (res.status === 500) {
                    setError(true);
                    return;
                }

                const result = await res.json();
                console.log(result)


                const cart: IData = {
                    values: result.data.values,
                    products: Object.values(result.data.products)
                };
                setData(cart);
                console.log(cart)
            } catch (err) {
                console.error("Failed to fetch cart data", err);
                setError(true);
            }
        };

        loadCartData();
    }, [router]);

    const removeProduct = useCallback(async (productId: number) => {
        const token = sessionStorage.getItem("Token");
        if (!token) return;

        try {
            await fetch(`http://localhost:8080/api/v1/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Reload cart data after removing product
            const updatedData = await fetchCartData();
            setData(updatedData);
        } catch (err) {
            console.error("Failed to remove product", err);
        }
    }, []);

    const fetchCartData = async () => {
        const token = sessionStorage.getItem("Token");
        const res = await fetch("http://localhost:8080/api/v1/cart", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch cart data");
        }
        return res.json();
    };

    if (error) {
        return (
            <>
                <Menu showRightMenu={true} />
                <div className="flex justify-center">
                    <p className="text-red-500">Error loading cart. Please try again later.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Menu showRightMenu={true} />
            <div className="flex justify-center">
                <div className="md:w-4/5">
                    <div className="text-[30px]">
                        <h1>Cart:</h1>
                    </div>
                    <div className="text-[20px]">
                        <p>Products:</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        {data?.products && data?.products.length! > 0 ? (
                            data!.products.map((item) => (
                                <>
                                <div key={item.id} className="flex shadow m-2 rounded-[18px] md:w-2/3">
                                    <Image
                                        src={cat}
                                        alt={item.name}
                                        className="h-auto w-1/3 rounded-l-[20px] md:h-[120px] md:w-auto"
                                        priority={true}
                                    />
                                    <div className="ml-2 mr-2 w-full">
                                        <div className="flex justify-between">
                                            <p className="text-[20px] font-bold">{item.name}</p>
                                            <button onClick={() => removeProduct(item.id)}>❌</button>
                                        </div>
                                        <p className="text-[15px]">Stock Quantity: {item.stock_qty}</p>
                                        <p className="text-[17px] text-red-600">Price: {item.price}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-[20px] absolute bottom-0 w-full border-2 bg-white p-2">
                                        <p className="text-center">
                                            Total Price:
                                            <span className="font-bold">${data?.values.total_price}</span>
                                        </p>
                                        <div className="flex justify-center">
                                            <button className="w-2/3 bg-pink-300 text-white rounded-md p-2 m-2">Buy</button>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No product in the cart.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
