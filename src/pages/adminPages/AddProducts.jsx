import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router";


const AddProducts = () => {
     const {user}= useAuth()
        
        const handleFormSubmission=async e=>{
            e.preventDefault()
            const form = e.target
            const title= form.title.value
            const price = form.price.value
            const description = form.description.value  
            const imageUrl = form.imageUrl.value 
            const adminEmail = user?.email
            // const totalOrder = 0
            const productData = {title,price,description,imageUrl,adminEmail}
            console.table(productData)
    
            try{
                const {data} = await axios.post(
                    `${import.meta.env.VITE_API_URL}/addItem`, productData
                )
                console.log(data)
                toast.success("Item's data added successfully")
                e.target.reset()
                
            }catch(err){
                console.log(err)
                e.target.reset()
            }
        }
    return (
        <div>
            <p className="text-yellow-600 text-center uppercase text-2xl font-bold my-10 underline">Add items</p>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    

    <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
                <label className="text-gray-700 dark:text-gray-200" for="username">Title</label>
                <input name="title" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>
            <div>

            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" for="emailAddress">Description</label>
                <input name="description" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" for="password">image</label>
                <input name="imageUrl"  type="url" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Price</label>
                <input  name="price" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:bg-gray-600">Save</button>
             <Link to={`/allProduct/${user?.email}`}><button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:bg-gray-600">All Items</button></Link>
        </div>
    </form>
</section>
            
        </div>
    );
};

export default AddProducts;