import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "@tanstack/react-router";

const ManufactureItem = ({ manufacture, user }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{manufacture?.id}</td>
      <td>{manufacture?.name}</td>
      {user && user?.role_id === 1 && (
        <>
          <td style={{ textAlign: "center" }}>
            <Button
              as={Link}
              href={`/manufactures/edit/${manufacture?.id}`}
              variant="warning"
              className="me-2"
            >
              Update
            </Button>
            <Button
              as={Link}
              href={`/manufactures/${manufacture?.id}`}
              variant="danger"
            >
              Delete
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

ManufactureItem.propTypes = {
  manufacture: PropTypes.object.isRequired,
};

export default ManufactureItem;
