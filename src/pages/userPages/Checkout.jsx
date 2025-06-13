import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";


const Checkout = () => {
    const{user}=useAuth();
    const navigate=useNavigate()
    const [startDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const[fakeTotal, setFakeTotal]=useState(0)
    const [subtotal, setSubtotal] = useState(0);
    const[customerSaving, setCustomerSaving] = useState(0)
    const[totalDiscounting, setTotalDiscounting]=useState(0)
const [shippingFee] = useState(80); // Made constant if not changing
const [total, setTotal] = useState(0);
    // / Fetch cart data
    useEffect(() => {
      getData();
    }, [user]);
    
    const getData = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/checkOutData/${user?.email}`);
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
        toast.error('Failed to load your cart');
      }
    };

    // handle Delete
           const handleDelete = (id) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      await axios.delete(`${import.meta.env.VITE_API_URL}/cartData/${id}`);
                      
                      await Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                      });
                      
                      getData();
                    } catch (err) {
                      await Swal.fire({
                        title: "Error!",
                        text: err.response?.data?.message || "Failed to delete product",
                        icon: "error"
                      });
                    }
                  }
                });
              };


    // Calculate prices whenever items change
useEffect(() => {
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + (item.productPrice * item.quantity),
    0
  );
  const calculatedFakeTotal = items.reduce(
    (sum, item) => sum + (item.uiPrice * item.quantity),
    0
  );
  const customerSaving = calculatedFakeTotal - calculatedSubtotal;
  const totalDiscounting = (customerSaving / calculatedFakeTotal) * 100;
  setCustomerSaving(customerSaving);
  setTotalDiscounting(totalDiscounting);
  setFakeTotal(calculatedFakeTotal);
  setSubtotal(calculatedSubtotal);
  setTotal(calculatedSubtotal + shippingFee);
}, [items, shippingFee]);

// form submission
const handleFormSubmission = async (e) => {
  e.preventDefault();
  
  // Validation checks
  if (!user?.email) {
    return toast.error('You must be logged in to place an order');
  }

  if (items.length === 0) {
    return toast.error('Your cart is empty');
  }

  // Prevent owners from ordering their own products
  const isOrderingOwnProducts = items.some(item => user.email === item.owner);
  if (isOrderingOwnProducts) {
    return toast.error("You can't order your own products");
  }

  const form = e.target;
  // Determine payment method
//   const paymentMethod = useStripePayment 
//     ? { status: 'paid', method: 'Stripe' }
//     : { status: form.delivery?.value || 'pending', method: 'Cash on Delivery' };
  
  // Prepare order data
  const orderData = {
    customerInfo: {
      name: form.name.value,
      address: form.address.value,
      phone: form.phone.value,
      city:form.city.value,
      
      email: user.email,
      
    },
    // payment:  paymentMethod,
    orderDetails: {
      date: startDate,
      method:form.delivery.value,
      status:'Pending',
      subtotal,
      shippingFee,
      total,
      totalDiscounting

    },
    products: items.map(item => ({
      id: item.cartProductId,
      name: item.addedProduct,
    //   brand: item.savedBrand,
      price: item.productPrice,
      
      quantity: item.quantity,
      image: item.productImage,
      owner: item.owner
    }))
  };

  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, orderData);
    console.log(data);
    toast.success('Order placed successfully!');
    navigate('/myOrder');
  } catch (err) {
    console.error('Order failed:', err);
    toast.error(err.response?.data?.message || 'Failed to place order');
  }
};

    return (
        <div>
            <p className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">Selected Items</p>
            <section className="container px-4 mx-auto">
            
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                
                                                <span>Product Name</span>
                                            </div>
                                        </th>
            
                                        
            
                                        
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th>
                                       
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
            
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Total</th>
            
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        items.map(item=>(
                                            <tr key={item._id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">  
                                                    <div>
                                                        <h2  className="font-medium text-gray-800 dark:text-white ">{item.addedProduct}</h2> 
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-10 h-10 rounded-full" src={item.productImage} alt=""/>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                      
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.productPrice} BDT</td>
                                        {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.quantity}</td> */}
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.quantity} Piece</td>
                                        
            
                                        
                                        
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button onClick={() => handleDelete(item._id)}  className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
            
                                                
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{(item.productPrice * item.quantity).toLocaleString('en-US')} BDT</td>
                                    </tr>
                                        ))
                                    }
            
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
    
            </section>
            {/* price count */}
            <div className="flex flex-row justify-end items-end gap-6  m-10">
                <div>
                  <p>SubTotal <span className="font-bold text-red-600 text-xl">(Without Offer)</span></p>
                    <p className="text-blue-600 capitalize" >SubTotal <span className="font-bold text-green-600 text-xl">(with offer)</span></p>
                    <p className="text-green-600">Shipping Fee</p>
                    <p className="text-purple-700">Save money</p>
                    <p className="text-red-600">Total</p>
                    <p className="text-orange-600">Discount </p>
                </div>
                <div>
                  <p>{fakeTotal.toLocaleString('en-US')} BDT</p>
                    <p className="text-blue-600">{subtotal.toLocaleString('en-US')} BDT</p>
                    <p className="text-green-600">{shippingFee.toLocaleString('en-US')} BDT</p>
                     <p className="text-purple-700">{customerSaving.toLocaleString('en-US')} BDT</p>
                    
                    <p className="text-red-600">{total.toLocaleString('en-US')} BDT</p>
    <p className="text-orange-600">{totalDiscounting.toFixed(2)}%</p>
                </div>
                

            </div>
            {/* customer info */}
            <p className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">Customer Information</p>
            <form onSubmit={handleFormSubmission} >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:mx-56 border-gray-200 border-2 p-5 rounded-lg">
            <div>
                <label className="text-yellow-600 font-bold text-lg dark:text-gray-200" >Your Name</label>
                <input name="name" type="text"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-yellow-600 font-bold text-lg dark:text-gray-200">Your Address</label>
                <input name="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-yellow-600 font-bold text-lg dark:text-gray-200" >Your Phone Number</label>
                <input name="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>
            <div>
                <label className="text-yellow-600 font-bold text-lg dark:text-gray-200" >Your City</label>
                <select name="city" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required>
                    
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
            

            <div>
                <label className="text-yellow-600 font-bold text-lg dark:text-gray-200">Order Date</label>
                <DatePicker className='border p-2 rounded-md' selected={startDate}  />
            </div>
            <div>
            <label className="text-yellow-600 font-bold text-lg dark:text-gray-200">Method</label>
           <br />
           <div className="mt-2 flex items-center gap-3">
           
          
        <input 
          type="checkbox" 
          name="delivery" 
          value="Cash On Delivery" 
          defaultChecked
          required
        //   onChange={() => handlePaymentMethodChange(false)}
        //   required={!useStripePayment} 
        />
        <label>Cash On Delivery</label>
      

           </div>

            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:bg-gray-600">Complete Order</button>
        </div>
    </form>
        </div>
    );
};

export default Checkout;