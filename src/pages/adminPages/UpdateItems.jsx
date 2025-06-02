import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";


const UpdateItems = () => {
    const navigate = useNavigate()
    const items = useLoaderData()
    console.log(items);
    const {_id,title,description,imageUrl,adminEmail,customerSave,fakePrice,mainPrice,totalDiscount} = items || {}
    const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const title= form.title.value
        // const price = form.price.value
        const description = form.description.value
        const customerSave =customerSave
        const fakePrice = fakePrice
        const mainPrice = mainPrice
        const totalDiscount = totalDiscount 
        const imageUrl = form.imageUrl.value 
       
       
        // const adminEmail = user?.email
        const productData = {title,description,imageUrl,totalDiscount,mainPrice,fakePrice,customerSave}
        console.table(productData)

        try{
            const {data} = await axios.put(
                `${import.meta.env.VITE_API_URL}/itemData/${_id}`, productData
            )
            console.log(data)
            toast.success('Product data updated successfully')
            navigate(`/allProduct/${adminEmail}`)
            
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
        <div className="m-10">
    <h2 className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">Update items</h2>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">

    <form onSubmit={handleFormSubmission} >
        <div className="grid  gap-6 mt-4 grid-cols-1">
            <div>
                <label className="text-yellow-600 dark:text-gray-200" >Product Name</label>
                <input name="title" defaultValue={title} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-yellow-600 dark:text-gray-200">Show Price</label>
                <input  name="price" defaultValue={fakePrice} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
             <div>
                <label className="text-yellow-600 dark:text-gray-200">Offer Price</label>
                <input  name="price" defaultValue={mainPrice} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            <div>
                <label className="text-yellow-600 dark:text-gray-200">Saving Price</label>
                <input disabled name="price" defaultValue={customerSave} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
             <div>
                <label className="text-yellow-600 dark:text-gray-200">Discount</label>
                <input disabled name="price" defaultValue={totalDiscount} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-yellow-600 dark:text-gray-200" >Description</label>
                <input name="description" defaultValue={description} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            

            
            <div>
                <label className="text-yellow-600 dark:text-gray-200">Image Url</label>
                <input name="imageUrl" defaultValue={imageUrl} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
           
        </div>

        <div className="flex justify-end mt-6 gap-2">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:bg-gray-600">Edit</button>
           
        </div>
    </form>
</section>
            
        </div>
    );
};

export default UpdateItems;