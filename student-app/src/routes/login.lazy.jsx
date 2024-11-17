import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../service/auth";
import { toast } from "react-toastify";
import NavigationBar from "../components/Navbar";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            {
                user.role_id === 1
                    ? navigate({ to: "/admin/cars" })
                    : navigate({ to: "/cars" });
            }
        }
    }, [navigate, user]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const body = {
            email,
            password,
        };

        const result = await login(body);
        if (result.success) {
            dispatch(setToken(result.data.token));
            return;
        }

        toast.error(result.message);
    };

    return (
        <>
            <Row className="vh-100 m-0">
                <Col
                    md={9}
                    className="d-flex align-items-center justify-content-center p-0"
                >
                    <img
                        src="/assets/images/image2.png"
                        alt="Pict"
                        style={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "cover",
                            margin: 0,
                            padding: 0,
                        }}
                    />
                </Col>
                <Col
                    md={3}
                    className="d-flex align-items-center justify-content-center"
                >
                    <div className="login-page">
                        <div>
                            <img
                                src="/assets/images/logo.png"
                                alt=""
                                width="90"
                                height="32"
                            />
                            <h3>
                                <b>Welcome, Admin BCR</b>
                            </h3>
                        </div>
                        <Form onSubmit={onSubmit}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="email"
                            >
                                <Form.Label column sm={3}>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Contoh: johndee@gmail.com"
                                    required
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="password"
                            >
                                <Form.Label column sm={3}>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="6+ karakter"
                                    required
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
}
