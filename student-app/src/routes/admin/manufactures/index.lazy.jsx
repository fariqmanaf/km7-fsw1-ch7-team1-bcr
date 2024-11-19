import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { getManufactures } from "../../../service/manufactures";
import ManufactureItem from "../../../components/Manufacture/ManufactureItem";
import ReactLoading from "react-loading";
import NavigationBar from "../../../components/Navbar";
import SideNavigationBar from "../../../components/SideNav";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/manufactures/")({
  component: Manufacture,
});

function Manufacture() {
  const { token, user } = useSelector((state) => state.auth);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["manufactures"],
    queryFn: () => getManufactures(),
    enabled: !!token,
  });

  if (!token) {
    return (
      <Row
        style={{ height: "90vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Col>
          <h4 className="text-center">
            Please login first to get manufactures data!
          </h4>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
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

  const manufactures = isSuccess ? data.data : [];

  return (
    <>
      <div>
        <SideNavigationBar />
      </div>
      <Row className="d-flex justify-content-between px-5 my-2 mt-4">
        <Row>
          <Col className="d-flex justify-content-between px-5 mb-4">
            <Row>
              <h3>List Manufactures</h3>
            </Row>
            {user?.role_id === 1 && (
              <Button
                as={Link}
                to={`/admin/manufactures/create`}
                style={{
                  transition: "all 0.3s",
                  backgroundColor: "#0d6efd",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#0d6efd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0d6efd";
                  e.currentTarget.style.color = "white";
                }}
              >
                + Add Manufactures
              </Button>
            )}
          </Col>
        </Row>
        {manufactures.length === 0 ? (
          <h1>Manufacture data is not found!</h1>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "8%" }}>Id</th>
                <th style={{ textAlign: "center", width: "72%" }}>
                  Manufacture
                </th>
                {user && user?.role_id === 1 && (
                  <th style={{ textAlign: "center", width: "20%" }}>
                    <h6>
                      <b>Options</b>
                    </h6>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {manufactures.map((manufacture) => (
                <ManufactureItem
                  user={user}
                  manufacture={manufacture}
                  key={manufacture?.id}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </>
  );
}

export default Manufacture;
