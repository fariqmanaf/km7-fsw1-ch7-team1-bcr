import { Link, useNavigate } from "@tanstack/react-router";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import PropTypes from "prop-types";

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
        <div
            className="d-flex flex-column flex-shrink-0 bg-light overflow-y-hidden"
            style={{ width: "4.5rem", height: "90vh" }}
        >
            <Link
                to="/"
                className="d-block p-3 link-dark text-decoration-none"
                title="Icon-only"
            >
                <img
                    src="/assets/images/logo.png"
                    alt=""
                    width="40"
                    height="32"
                />
                <span className="visually-hidden">Icon-only</span>
            </Link>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li>
                    <Link
                        to="/cars"
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
                        to="/manufactures"
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
                        to="/specs"
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
                        to="/options"
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
