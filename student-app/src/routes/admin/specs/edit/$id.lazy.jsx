import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getDetailSpec, updateSpec } from '../../../../service/spec'
import { toast } from 'react-toastify'
import { IoArrowBackCircle } from 'react-icons/io5'
import Protected from '../../../../components/Auth/Protected'
import { useMutation, useQuery } from "@tanstack/react-query";


export const Route = createLazyFileRoute('/admin/specs/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditSpec />
    </Protected>
  ),
})

function EditSpec() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [spec, setSpec] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ["spec", id],
    queryFn: () => getDetailSpec(id),
    onSuccess: (result) => {
      if (result?.success) {
        setSpec(result.data?.spec);
      }
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (newOption) => updateSpec(id, newOption),
    onSuccess: (result) => {
      if (result?.success) {
        toast.success("Spec updated successfully!");
        navigate({ to: "/admin/specs" });
      } else {
        toast.error(result?.message);
      }
    },
    onError: () => {
      toast.error("An error occurred while updating the spec.");
    },
  });

  if (isError) {
    navigate({ to: "/admin/specs" });
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const request = { spec };
    mutation.mutate(request);
  }

  function onClickBack() {
    navigate({ to: "/admin/options" });
  }

  if (isLoading || mutation.isLoading) {
    return <div>Loading...</div>;
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
              <h4 className="mb-4 text-center fw-bold">Update Specs</h4>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="spec">
                  <Form.Label column sm={3}>
                    Spec
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Spec"
                      required
                      value={data.option}
                      onChange={(event) => setSpec(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    disabled={mutation.isLoading}
                    variant="primary"
                  >
                    Update Spec
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
