import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { getOptions } from '../../../service/options'
import OptionItem from '../../../components/Option/OptionItem'
import ReactLoading from 'react-loading'

export const Route = createLazyFileRoute('/admin/options/')({
  component: Option,
})

function Option() {
  const { token, user } = useSelector((state) => state.auth)
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getOptionData = async () => {
      setIsLoading(true)
      const result = await getOptions()
      if (result.success && result.data) {
        setOptions(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getOptionData()
    }
  }, [token])

  if (!token) {
    return (
      <Row
        style={{ height: '90vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Col>
          <h4 className="text-center">
            Please login first to get Options data!
          </h4>
        </Col>
      </Row>
    )
  }

  if (isLoading) {
    return (
      <div
        style={{ height: '90vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <ReactLoading
          type={'spin'}
          color={'#0d6efd'}
          height={'5%'}
          width={'5%'}
        />
      </div>
    )
  }

  return (
    <Row className="d-flex justify-content-between px-5 my-2 mt-4">
      <Row>
        <Col className="d-flex justify-content-between px-5 mb-4">
          <Row>
            <h3>List Options</h3>
          </Row>
          {user?.role_id === 1 && (
            <Button
              as={Link}
              href={`/admin/options/create`}
              style={{
                transition: 'all 0.3s',
                backgroundColor: '#0d6efd',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')(
                  (e.currentTarget.style.color = '#0d6efd'),
                )
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#0d6efd')(
                  (e.currentTarget.style.color = 'white'),
                )
              }
            >
              + Add Options
            </Button>
          )}
        </Col>
      </Row>
      {options.length === 0 ? (
        <h1>Option data is not found!</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: '8%' }}>Id Option</th>
              <th style={{ textAlign: 'center', width: '72%' }}>Option</th>
              {user && user?.role_id === 1 && (
                <th style={{ textAlign: 'center', width: '20%' }}>
                  <h6>
                    <b>Options</b>
                  </h6>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <OptionItem user={user} option={option} key={option?.id} />
            ))}
          </tbody>
        </Table>
      )}
    </Row>
  )
}

export default Option
