import { Link } from "react-router";


const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ 
  backgroundImage: "url(https://giftall.s3.amazonaws.com/uploads/images/product/product_1582860214.jpg)",
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold text-white mb-5">Pitha Peyari</h1>
      <Link to={'/shop'}><button className="btn bg-yellow-600 text-white font-bold">Shop</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default Home;