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
        
        
        const orderData = {name,phone,address,city}
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
                    <option value="">Select District</option>
  <option value="Bagerhat">Bagerhat</option>
  <option value="Bandarban">Bandarban</option>
  <option value="Barguna">Barguna</option>
  <option value="Barishal">Barishal</option>
  <option value="Bhola">Bhola</option>
  <option value="Bogra">Bogra</option>
  <option value="Brahmanbaria">Brahmanbaria</option>
  <option value="Chandpur">Chandpur</option>
  <option value="Chapainawabganj">Chapainawabganj</option>
  <option value="Chattogram">Chattogram</option>
  <option value="Chuadanga">Chuadanga</option>
  <option value="Cox's Bazar">Cox's Bazar</option>
  <option value="Cumilla">Cumilla</option>
  <option value="Dhaka">Dhaka</option>
  <option value="Dinajpur">Dinajpur</option>
  <option value="Faridpur">Faridpur</option>
  <option value="Feni">Feni</option>
  <option value="Gaibandha">Gaibandha</option>
  <option value="Gazipur">Gazipur</option>
  <option value="Gopalganj">Gopalganj</option>
  <option value="Habiganj">Habiganj</option>
  <option value="Jamalpur">Jamalpur</option>
  <option value="Jashore">Jashore</option>
  <option value="Jhalokati">Jhalokati</option>
  <option value="Jhenaidah">Jhenaidah</option>
  <option value="Joypurhat">Joypurhat</option>
  <option value="Khagrachhari">Khagrachhari</option>
  <option value="Khulna">Khulna</option>
  <option value="Kishoreganj">Kishoreganj</option>
  <option value="Kurigram">Kurigram</option>
  <option value="Kushtia">Kushtia</option>
  <option value="Lakshmipur">Lakshmipur</option>
  <option value="Lalmonirhat">Lalmonirhat</option>
  <option value="Madaripur">Madaripur</option>
  <option value="Magura">Magura</option>
  <option value="Manikganj">Manikganj</option>
  <option value="Meherpur">Meherpur</option>
  <option value="Moulvibazar">Moulvibazar</option>
  <option value="Munshiganj">Munshiganj</option>
  <option value="Mymensingh">Mymensingh</option>
  <option value="Naogaon">Naogaon</option>
  <option value="Narail">Narail</option>
  <option value="Narayanganj">Narayanganj</option>
  <option value="Narsingdi">Narsingdi</option>
  <option value="Natore">Natore</option>
  <option value="Netrokona">Netrokona</option>
  <option value="Nilphamari">Nilphamari</option>
  <option value="Noakhali">Noakhali</option>
  <option value="Pabna">Pabna</option>
  <option value="Panchagarh">Panchagarh</option>
  <option value="Patuakhali">Patuakhali</option>
  <option value="Pirojpur">Pirojpur</option>
  <option value="Rajbari">Rajbari</option>
  <option value="Rajshahi">Rajshahi</option>
  <option value="Rangamati">Rangamati</option>
  <option value="Rangpur">Rangpur</option>
  <option value="Satkhira">Satkhira</option>
  <option value="Shariatpur">Shariatpur</option>
  <option value="Sherpur">Sherpur</option>
  <option value="Sirajganj">Sirajganj</option>
  <option value="Sunamganj">Sunamganj</option>
  <option value="Sylhet">Sylhet</option>
  <option value="Tangail">Tangail</option>
  <option value="Thakurgaon">Thakurgaon</option>
                </select>
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