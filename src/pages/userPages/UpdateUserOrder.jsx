import { useLoaderData, useNavigate} from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUserOrder = () => {
    const editData= useLoaderData()
    console.log(editData);
    const navigate= useNavigate()

    const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const name= form.customerName.value
        const phone = form.customerNumber.value
        const address = form.customerAddress.value
        const city = form.city.value
        const zipCode = form.zip.value
        
        const orderData = {name,phone,address,city,zipCode}
        console.table(orderData)

        try{
            const {data} = await axios.patch(
                `${import.meta.env.VITE_API_URL}/orderData/${editData._id}`, orderData
            )
            console.log(data)
            toast.success('Data updated successfully')
            navigate('/myOrder')
            
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
         <div className="m-10">
             <h2 className="text-yellow-600 text-center capitalize text-2xl font-bold my-10 underline">Update Order Data</h2>
             <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-yellow-600 font-bold dark:text-gray-200" >Your Name</label>
                <input name="customerName" defaultValue={editData.customerInfo.name} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-yellow-600 font-bold dark:text-gray-200">Phone Number</label>
                <input name="customerNumber" defaultValue={editData.customerInfo.phone} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-yellow-600 font-bold dark:text-gray-200" >Address</label>
                <input name="customerAddress" defaultValue={editData.customerInfo.address} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            <div>
                <label className="text-yellow-600 font-bold dark:text-gray-200" >Your City</label>
                <select name="city" type="text" defaultValue={editData.customerInfo.city} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required>
                    <option value=""></option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylet">Sylet</option>
                    <option value="Rajshahi">Rajshahi</option>
                      <option value="Joshor">Joshor</option>
                       <option value="Khulna">Khulna</option>
                        <option value="Borishal">Borishal</option>
                </select>
            </div>
            <div>
                <label className="text-yellow-600 font-bold dark:text-gray-200" >Zip Code</label>
                <input name="zip" type="number" defaultValue={editData.customerInfo.zipCode} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>
           
        </div>

        <div className="flex justify-end mt-6 gap-2">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Edit</button>
           
        </div>
    </form>
    </section>
            
        </div>
    );
};

export default UpdateUserOrder;