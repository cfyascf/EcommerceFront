import { ROUTES } from "@/app/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cat from "@/img/cat.jpg";

export const ProductCard = (item : { name: string, id: number, description: string, price: number  }) => {
    const router = useRouter();

    const handleBuy = async (productId: number) => {
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
        <div>
            <div key={item.id} className="p-1">
                <div className="border rounded-lg">
                    <div>
                        <Image
                        src={cat}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="object-cover w-[300px] h-[300px] rounded-t-[15px]"
                        priority={true}
                        />
                    </div>
                    <div className="p-1">
                        <div className="flex justify-center font-bold">{item.id}: {item.name}</div>
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
                        <button
                            className="w-2/3 bg-pink-300 text-white rounded-md p-2 m-2 hover:bg-pink-700"
                            onClick={() => handleBuy(item.id)}
                            >
                            Buy
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
