import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getOptions } from "../../../service/options";
import OptionItem from "../../../components/Option/OptionItem";
import ReactLoading from "react-loading";
import SideNavigationBar from "../../../components/SideNav";
import { useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/options/")({
  component: () => (
    <Protected roles={[1]}>
      <Option />
    </Protected>
  ),
});

function Option() {
  const { token, user } = useSelector((state) => state.auth);

  const tableRef = useRef(null);
  const containerRef = useRef(null);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["options"],
    queryFn: () => getOptions(),
    enabled: !!token,
  });

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.set(tableRef.current, { opacity: 0, y: 50 });

      gsap.to(tableRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);
  }, [isPending]);

  if (!token) {
    return (
      <Row
        style={{ height: "90vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Col>
          <h4 className="text-center">
            Please login first to get Options data!
          </h4>
        </Col>
      </Row>
    );
  }

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

  const options = isSuccess ? data.data : [];

  return (
    <>
      <div>
        <SideNavigationBar />
      </div>

      <Row className="mt-5 ms-xl-5" ref={containerRef}>
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
                  transition: "all 0.3s",
                  backgroundColor: "#0d6efd",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")(
                    (e.currentTarget.style.color = "#0d6efd")
                  )
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0d6efd")(
                    (e.currentTarget.style.color = "white")
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
          <Table
            ref={tableRef}
            className="px-5"
            striped
            bordered
            hover
            fluid
            style={{ marginLeft: "3rem", flex: 5 }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "8%" }}>Id Option</th>
                <th style={{ textAlign: "center", width: "72%" }}>Option</th>
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
              {options.map((option) => (
                <OptionItem user={user} option={option} key={option?.id} />
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </>
  );
}

export default Option;
