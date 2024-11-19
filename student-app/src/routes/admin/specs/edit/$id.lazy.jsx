import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from "react";
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

  const { data: editspec, isSuccess, isError } = useQuery({
    queryKey: ["editspec", id],
    queryFn: () => getDetailSpec(id),
    enabled: !!id,
  });

  const { mutate: update, isPending: isUpdateProcessing } = useMutation({
    mutationFn: (request) => updateSpec(id, request),
    onSuccess: () => {
        toast.success("Spec updated successfully!");
        navigate({ to: "/admin/specs" })
      }, 
        onError: (error) => {
        toast.error(error?.message);
      },
  })

   useEffect(() => {
     if (isSuccess) {
       setSpec(editspec.data?.spec);
     }
   }, [isSuccess, editspec])

  if (isError) {
    navigate({ to: "/admin/specs" });
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const request = { spec };
    update(request);
  }

  function onClickBack() {
    navigate({ to: "/admin/specs" });
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
                      value={spec}
                      onChange={(event) => setSpec(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    disabled={isUpdateProcessing}
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
