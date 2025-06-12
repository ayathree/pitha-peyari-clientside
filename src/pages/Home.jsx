import { Link } from "react-router";
import { FaArrowDownLong } from "react-icons/fa6";


const Home = () => {
    return (
        <div>
          {/* banner */}
            <div className="hero min-h-screen" style={{ 
  backgroundImage: "url(https://i.ibb.co/0j5rjXwX/image.png)",
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  <div className="hero-overlay opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <FaArrowDownLong className="text-9xl " />
  </div>
</div>
{/* category card */}
<div className="mt-20">
  <p className="text-yellow-600 text-center uppercase text-2xl font-bold my-10 underline">Category</p>
  
<div className="grid grid-cols-2 justify-center items-center gap-3">
  {/* 1 */}
  <div className="bg-yellow-300 h-[60vh] flex justify-center items-center gap-2 hover:bg-yellow-600">

 <div>
   <p className="text-9xl text-center font-bold text-red-800 ">পিঠা</p>
   <p className="text-4xl font-semibold bg-red-800 text-yellow-300 capitalize">with offer price</p>
 </div>
  <img className="rounded-full" src="https://i.ibb.co/XfXvbLvG/image.png" alt="" />
  
  

  </div>
  {/* 2 */}
  <div className="bg-yellow-300 h-[60vh] flex justify-center items-center gap-2 hover:bg-yellow-600">
<div>
  <p className="text-9xl text-center font-bold text-red-800 ">ঝাল</p>
  <p className="text-4xl font-semibold bg-red-800 text-yellow-300 capitalize">with offer price</p>
</div>
<img className="rounded-full" src="https://i.ibb.co/1c7thPG/image.png" alt="" />
  </div>
</div>
</div>
        </div>
    );
};

export default Home;