import { Link, Route } from "react-router-dom";
import logo from "../assets/images/logo-white.png";
import { Button } from "./ui/button";
// Icons
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "../helpers/RouteName";
const Topbar = () => {
  return (
    <header className="flex justify-between items-center gap-8 h-16 fixed w-full z-50 bg-white px-3 border-b">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="w-[32rem]">
        <SearchBox />
      </div>
      <div className="shrink-0">
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn}>
            <MdLogin />
            Sign In
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
