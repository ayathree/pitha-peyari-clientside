import { Link } from "react-router";


const Error = () => {
    return (
        <div>
           <p>error happen</p> 
           <Link to={'/shop'}><button className="btn">Go back</button></Link>
        </div>
    );
};

export default Error;