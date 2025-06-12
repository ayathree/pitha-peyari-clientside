import { Link, useLoaderData } from "react-router";
import { FaArrowRight, FaHeart } from "react-icons/fa";


const Category = () => {
    const products= useLoaderData([])
        console.log(products)
    return (
        <div>
            <p className="text-yellow-600 text-center uppercase text-2xl font-bold my-10 underline">Category</p>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
               {
                products.map(item=>(
                     <div key={item._id} className="card bg-yellow-100 hover:bg-amber-200 shadow-lg ">
  <figure className="relative">
    <img
      src={item.imageUrl}
      alt=""
      className="rounded-t-xl w-full h-[40vh]  " />
      
      <p className=" font-bold absolute -top-2 -left-3 bg-amber-300 p-4 rounded-full text-red-600 text-center "><span className="text-xl">{item.totalDiscount}%</span> <br />discount</p>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{item.title}</h2>
    <p><span className="text-xl text-red-600">{item.fakePrice}</span> টাকার পণ্য এখন মাত্র <span className="text-xl text-red-600" >{item.mainPrice}</span> টাকায়, <span className="text-xl text-red-600">{item.customerSave}</span> টাকা সাশ্রয়</p>
    {/* <FaHeart onClick={() => handleWish(item._id)} className="text-2xl text-yellow-600 hover:text-yellow-800 cursor-pointer" /> */}
    
    <div className="card-actions">
      {/* <button onClick={() => handleCart(item._id)} className="btn bg-yellow-600 capitalize text-white hover:bg-yellow-800">Add to cart</button> */}
      <Link to={`/itemDetails/${item._id}`}><button className="btn bg-yellow-600 capitalize text-white hover:bg-yellow-800" ><FaArrowRight /></button> </Link>
    </div>
  </div>

</div>
                ))
               }
             </div>
            
        </div>
    );
};

export default Category;