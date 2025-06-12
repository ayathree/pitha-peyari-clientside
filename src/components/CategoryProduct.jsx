import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";


const CategoryProduct = () => {
    const [items, setItems]= useState([]);
      const [isLoading, setIsLoading]= useState([]);
          useEffect(()=>{
            setIsLoading(true)
            const getData = async ()=>{
              const {data}= await axios (`${import.meta.env.VITE_API_URL}/addItem`)
              setItems(data)
              setIsLoading(false)
            }
            getData()
          },[])
    return (
        <div>
          {
            isLoading?(
                <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-yellow-600  loading-lg"></span>
    </div>
            ):(
                  <div className="grid grid-cols-2 justify-center items-center gap-3">
  {/* 1 */}
 {
    items.filter(p=>p.category === 'pitha').slice(0, 1).map(item=>(
         <Link key={item._id} to={`/categories/${item.category}`}>
         <div className="bg-yellow-300 h-[60vh] flex justify-center items-center gap-2 hover:bg-yellow-600">

 <div>
   <p className="text-9xl text-center font-bold text-red-800 ">পিঠা</p>
   <p className="text-4xl font-semibold bg-red-800 text-yellow-300 capitalize">with offer price</p>
 </div>
  <img className="rounded-full" src="https://i.ibb.co/XfXvbLvG/image.png" alt="" />
  
  

  </div></Link>
    ))
 }
  {/* 2 */}
  {
    items.filter(p=>p.category ==='Spicy').slice(0, 1).map(item=>(
        <Link key={item._id} to={`/categories/${item.category}`}>
        <div  className="bg-yellow-300 h-[60vh] flex justify-center items-center gap-2 hover:bg-yellow-600">
<div>
  <p className="text-9xl text-center font-bold text-red-800 ">ঝাল</p>
  <p className="text-4xl font-semibold bg-red-800 text-yellow-300 capitalize">with offer price</p>
</div>
<img className="rounded-full" src="https://i.ibb.co/1c7thPG/image.png" alt="" />
  </div></Link>
    ))
  }
</div>
            )
          }
            
        </div>
    );
};

export default CategoryProduct;