import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 sticky top-0">
            <div className="container mx-auto flex justify-between">

                <h1 className="text-2xl font-bold">
                    User CRUD
                </h1>

                <div className="flex gap-5">

                    <Link to="/">Home</Link>

                    <Link to="/create">
                        Create User
                    </Link>

                    <Link to="/read">
                        Users
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;