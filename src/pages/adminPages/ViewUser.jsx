import { useLoaderData } from "react-router";


const ViewUser = () => {
    const items = useLoaderData()
    console.log(items);
    return (
        <div>
            {
                items.map(item=>(<div key={item._id}>
                    <p >{item.customerInfo.city}</p>
                    <p>{item.products.map(product=>(<p key={product._ke}>{product.owner}</p>))}</p>
                    <p>{item.orderDetails.total}</p>
                    <p>{item.products.map(product=>(<p key={product._ke}>{product.name}</p>))}</p>
                </div>))
            }
        </div>
    );
};

export default ViewUser;