import { useLoaderData } from "react-router";


const ViewUser = () => {
    const item = useLoaderData()
    console.log(item);
    return (
        <div>
            <p>{item.customerInfo.name}</p>
            <p>{item.customerInfo.method}</p>
            <p>{item.customerInfo.address}</p>
            <p>{item.customerInfo.phone}</p>
            <p>{item.customerInfo.city}</p>
            <p>{item.customerInfo.zipCode}</p>
            <p>{item.orderDetails.date}</p>
            <p>{item.orderDetails.method}</p>
            <p>{item.orderDetails.status}</p>
            <p>{item.orderDetails.subtotal}</p>
            <p>{item.orderDetails.shippingFee}</p>
            <p>{item.orderDetails.total}</p>
            <p>{item.products.map(product=>(<div key={product._id}>
                <p>{product.name}</p>
            <p>{product.price}</p>
             <p>{product.quantity}</p>
              <p>{product.image}</p>
               <p>{product.owner}</p>
            </div>
            ))}</p>
            
            
        </div>
    );
};

export default ViewUser;