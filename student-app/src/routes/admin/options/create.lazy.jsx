import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createOption } from "../../../service/options";
import { IoArrowBackCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/options/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateOption />
    </Protected>
  ),
});

function CreateOption() {
  const navigate = useNavigate();
  const [option, setOption] = useState("");

  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createOption(request),
    onSuccess: () => {
      navigate({ to: "/admin/options" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      option,
    };
    create(request);
  };

  function onClickBack() {
    navigate({ to: "/admin/options" });
  }

  return (
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
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="option">
                  <h4 className="mb-4 text-center fw-bold">Create Options</h4>
                  <Form.Label column sm={3}>
                    Option
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Option"
                      required
                      value={option}
                      onChange={(event) => setOption(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Option
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}
