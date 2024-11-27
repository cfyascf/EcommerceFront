export const SupplierCard = (item : { name: string, adress: string  }) => {
    return (
        <div>
            <div className="p-1">
                <div className="border rounded-lg">
                    <div className="p-1">
                        <div className="flex justify-center font-bold">{item.name}</div>
                        <div className="flex justify-center">
                            <p className="flex items-center text-center p-1">
                                {item.adress}
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
