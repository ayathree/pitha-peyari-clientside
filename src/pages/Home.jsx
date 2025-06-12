import { Link } from "react-router";
import { FaArrowDownLong } from "react-icons/fa6";
import CategoryProduct from "../components/CategoryProduct";


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
  
<CategoryProduct></CategoryProduct>
</div>
        </div>
    );
};

export default Home;