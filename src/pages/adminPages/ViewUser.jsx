import { useLoaderData } from "react-router";


const ViewUser = () => {
    const item = useLoaderData()
    console.log(item);
    return (
        <div>
            <p>{item.orderDetails.total}</p>
            
        </div>
    );
};

export default ViewUser;