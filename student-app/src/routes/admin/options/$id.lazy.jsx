import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteoption, getDetailOption } from "../../../service/options";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import ReactLoading from "react-loading";
import { IoArrowBackCircle } from "react-icons/io5";
import Protected from "../../../components/Auth/Protected";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/options/$id")({
  component: () => (
    <Protected roles={[1]}>
      <OptionDetail />
    </Protected>
  ),
});

function OptionDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [option, setOption] = useState(null);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["options", id],
    queryFn: () => getDetailOption(id),
    enabled: !!id,
  });

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: () => deleteoption(id),
    onSuccess: () => {
      navigate({ to: "/admin/options" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOption(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
    return (
      <div
        style={{ height: "90vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <ReactLoading
          type={"spin"}
          color={"#0d6efd"}
          height={"5%"}
          width={"5%"}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Option is not found!</h1>
        </Col>
      </Row>
    );
  }

  const onDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            deleting();
            if (result?.success) {
              navigate({ to: "/admin/options" });
              return;
            }

            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  function onClickBack() {
    navigate({ to: "/admin/options" });
  }

  console.log(option);
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
        <Col className="offset-md-3">
          <Card>
            <Card.Body>
              <h4 className="mb-4 text-center fw-bold">Delete Options</h4>
              <Card.Title>Detail </Card.Title>
              <Card.Text>Option: {option?.data.option}</Card.Text>
              <div className="d-grid gap-2">
                <Button
                  onClick={onDelete}
                  variant="danger"
                  disabled={isDeleteProcessing}
                >
                  Delete Option
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Row>
  );
}
