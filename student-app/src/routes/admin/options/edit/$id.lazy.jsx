import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getDetailOption, updateOption } from "../../../../service/options";
import { toast } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";
import Protected from "../../../../components/Auth/Protected";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/options/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditOption />
    </Protected>
  ),
});

function EditOption() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [option, setOption] = useState("");

  const {
    data: editoption,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["editoption", id],
    queryFn: () => getDetailOption(id),
    enabled: !!id,
  });

  const { mutate: update, isPending: isUpdateProcessing } = useMutation({
    mutationFn: (request) => updateOption(id, request),
    onSuccess: () => {
      toast.success("Options updated successfully!");
      navigate({ to: "/admin/options" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOption(editoption.data?.option);
    }
  }, [isSuccess, editoption]);

  if (isError) {
    navigate({ to: "/admin/options" });
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = { option };
    update(request);
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
              <h4 className="mb-4 text-center fw-bold">Update Options</h4>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="option">
                  <Form.Label column sm={3}>
                    option
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="option"
                      required
                      value={option}
                      onChange={(event) => setOption(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isUpdateProcessing}
                  >
                    Update option
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
