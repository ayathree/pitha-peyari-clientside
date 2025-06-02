import { useLoaderData } from "react-router";


const ViewUser = () => {
    const item = useLoaderData()
    console.log(item);
    return (
        <div className="mt-20">
            <h1 className="underline text-2xl font-bold text-yellow-600 my-5">Customer Information:</h1>
            <p><span className="font-bold text-xl">Customer Name:</span> {item.customerInfo.name}</p>
            <p><span className="font-bold text-xl">Customer Address:</span> {item.customerInfo.address}</p>
            <p><span className="font-bold text-xl">Phone:</span> {item.customerInfo.phone}</p>
            <p><span className="font-bold text-xl">City:</span> {item.customerInfo.city}</p>
            <p><span className="font-bold text-xl">Zip Code:</span> {item.customerInfo.zipCode}</p>
            <h1 className="underline text-2xl font-bold text-yellow-600 my-5">Items Details:</h1>
            <p>{item.products.map((product, index)=>(<li  key={product._id}>
                <p><span className="font-bold text-xl text-yellow-600">Item No: {index + 1}</span> </p>

                <p><span className="font-bold text-xl">Item Name:</span> {product.name}</p>
            <p><span className="font-bold text-xl">Item Price:</span> {product.price}</p>
             <p><span className="font-bold text-xl">Quantity:</span> {product.quantity}</p>
              
               
            </li>
            ))}</p>
            <h1 className="underline text-2xl font-bold text-yellow-600 my-5">Order Details:</h1>
            <p><span className="font-bold text-xl">Order Date:</span> {item.orderDetails.date}</p>
            <p><span className="font-bold text-xl">Order Method:</span> {item.orderDetails.method}</p>
            <p><span className="font-bold text-xl">Status:</span> {item.orderDetails.status}</p>
            <p><span className="font-bold text-xl">Subtotal:</span> {item.orderDetails.subtotal} BDT</p>
            <p><span className="font-bold text-xl">Shipping Fee:</span> {item.orderDetails.shippingFee} BDT</p>
            <p><span className="font-bold text-xl">Grand Total:</span> {item.orderDetails.total} BDT</p>
            
            
            
        </div>
    );
};

export default ViewUser;