import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createManufacture } from '../../service/manufactures'
import { IoArrowBackCircle } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Protected from '../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/manufactures/create')({
  component: () => (
    <Protected roles={[1]}>
      <CreateManufacture />
    </Protected>
  ),
})

function CreateManufacture() {
  const navigate = useNavigate()
  const [manufacture, setManufacture] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = { manufacture }
    const result = await createManufacture(request)
    if (result?.success) {
      toast.success('Manufacture created successfully!')
      navigate({ to: '/manufactures' })
    } else {
      toast.error(result?.message)
    }
  }

  function onClickBack() {
    navigate({ to: '/specs' })
  }

  return (
    <Row
      className="d-flex flex justify-content-center align-items-center"
      style={{ height: '50vh' }}
    >
      <IoArrowBackCircle
        className="position-absolute"
        role="button"
        onClick={onClickBack}
        style={{
          color: '#0d6efd',
          width: '7vw',
          height: '7vh',
          top: '6rem',
          left: '7rem',
        }}
      />
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="manufactures">
                  <h4 className="mb-4 text-center fw-bold">
                    Create Manufactures
                  </h4>
                  <Form.Label column sm={3}>
                    Manufacture
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Manufacture Name"
                      required
                      value={manufacture}
                      onChange={(event) => setManufacture(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Manufacture
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Row>
  )
}
