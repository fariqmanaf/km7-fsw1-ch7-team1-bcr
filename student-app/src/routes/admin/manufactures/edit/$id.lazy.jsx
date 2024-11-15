import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
  getDetailManufacture,
  updateManufacture,
} from '../../../service/manufactures'
import { toast } from 'react-toastify'
import { IoArrowBackCircle } from 'react-icons/io5'
import Protected from '../../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/manufactures/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditManufacture />
    </Protected>
  ),
})

function EditManufacture() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [manufacture, setManufacture] = useState('')
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const getDetailManufactureData = async (id) => {
      const result = await getDetailManufacture(id)
      if (result?.success) {
        setManufacture(result.data?.name)
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
    }

    if (id) {
      getDetailManufactureData(id)
    }
  }, [id])

  if (isNotFound) {
    navigate({ to: '/manufactures' })
    return
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = { manufacture }
    const result = await updateManufacture(id, request)
    if (result?.success) {
      toast.success('Manufacture updated successfully!')
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
              <h4 className="mb-4 text-center fw-bold">Update Manufactures</h4>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="manufacture">
                  <Form.Label column sm={3}>
                    Manufacture
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Manufacture"
                      required
                      value={manufacture}
                      onChange={(event) => setManufacture(event.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Update Manufacture
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
