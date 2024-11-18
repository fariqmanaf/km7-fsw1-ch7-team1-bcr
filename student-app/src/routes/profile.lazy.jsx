import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  function onClickBack() {
    window.history.back();
  }

  return (
    <>
    <Row
      className="d-flex flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <IoArrowBackCircle
        className="position-absolute"
        role="button"
        onClick={onClickBack}
        style={{
          color: "#0d6efd",
          width: "7vw",
          height: "7vh",
          top: "6rem",
          left: "7rem",
        }}
      />
      <IoArrowBackCircle
        className="position-absolute"
        role="button"
        onClick={onClickBack}
        style={{
          color: "#0d6efd",
          width: "7vw",
          height: "7vh",
          top: "6rem",
          left: "7rem",
        }}
      />
      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Img variant="top" src={user?.profile_picture} />
            <Card.Body>
              <Card.Title>{user?.name}</Card.Title>
              <Card.Text>{user?.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Row>
    </>
  );
}
