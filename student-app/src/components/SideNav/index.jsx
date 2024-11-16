import { Link, useNavigate } from "@tanstack/react-router";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import PropTypes from "prop-types";
import { IoMdHome } from "react-icons/io";

const SideNavigationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getProfile = async () => {
            const result = await profile();
            if (result.success) {
                dispatch(setUser(result.data));
                return;
            }

            dispatch(setUser(null));
            dispatch(setToken(null));
            navigate({ to: "/login" });
        };

        if (token) {
            getProfile();
        }
    }, [dispatch, navigate, token]);

    return (
        // <div
        //     className="d-flex flex-column flex-shrink-0 bg-light overflow-y-hidden"
        //     style={{ width: "4.5rem", height: "90vh" }}
        // >
            <div
            className="d-flex flex-column bg-light overflow-y-hidden"
            style={{
                position: "fixed", 
                top: 0, 
                left: 0, 
                width: "4.5rem", 
                height: "100vh", 
                zIndex: 1000, 
                boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", 
            }}
        >
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li>
                    <Link
                        to="/"
                        className="nav-link py-3 border-bottom"
                        title="Icon-only"
                    >
                        <IoMdHome
                            className=""
                            style={{ width: "25px", height: "25px" }}
                        />
                        <span
                            className="fw-bold"
                            style={{ fontSize: "0.7rem" }}
                        >
                            Home
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/cars"
                        className="nav-link py-3 border-bottom"
                        title="Car"
                    >
                        <Image
                            src="/assets/images/Car.png"
                            alt="Car Icon"
                            width="30"
                            height="30"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/manufactures"
                        className="nav-link py-3 border-bottom"
                        title="Manufacture"
                    >
                        <Image
                            src="/assets/images/Manufacture.png"
                            alt="Manufacture Icon"
                            width="32"
                            height="32"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/specs"
                        className="nav-link py-3 border-bottom"
                        title="Spec"
                    >
                        <Image
                            src="/assets/images/Spec.png"
                            alt="Spec Icon"
                            width="30"
                            height="33"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/options"
                        className="nav-link py-3 border-bottom"
                        title="Option"
                    >
                        <Image
                            src="/assets/images/Option.png"
                            alt="Option Icon"
                            width="30"
                            height="33"
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
};
SideNavigationBar.propTypes = {
    sidenav: PropTypes.object,
};
export default SideNavigationBar;
