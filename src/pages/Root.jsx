import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


const Root = () => {
    return (
        <div className="mx-7">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
    );
};

export default Root;