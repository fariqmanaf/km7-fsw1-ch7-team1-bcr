import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { register } from "../service/auth";
import { setToken } from "../redux/slices/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  if (token) {
    navigate({ to: "/cars" });
  }

  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => {
      return register(body);
    },
    onSuccess: (data) => {
      // set token to global state
      dispatch(setToken(data.data.token));

      // redirect to home
      navigate({ to: "/cars" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and confirmation must match!");
      return;
    }

    const request = {
      name,
      email,
      password,
      profilePicture,
    };

    registerUser(request);
  };

  return (
    <>
      <Row className="vh-100 m-0">
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center p-0"
        >
          <img
            src="/assets/images/image2.png"
            alt="Pict"
            style={{
              width: "100%",
              height: "100vh", // Full viewport height
              objectFit: "cover",
              margin: 0,
              padding: 0,
            }}
          />
        </Col>
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <Row>
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
                <Form.Group as={Row} className="mb-3" controlId="name">
                  <Form.Label column sm={3}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm={3}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                  <Form.Label column sm={3}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="confirmPassword"
                >
                  <Form.Label column sm={3}>
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="profilePicture"
                >
                  <Form.Label column sm={3}>
                    Profile Picture
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    required
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                    }}
                    accept=".jpg,.png"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Register
                  </Button>
                </div>
              </Form>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Register;
