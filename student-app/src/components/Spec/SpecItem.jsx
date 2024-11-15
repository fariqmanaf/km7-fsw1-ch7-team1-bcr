import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "@tanstack/react-router";

const SpecItem = ({ spec, user }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{spec?.id}</td>
      <td>{spec?.spec}</td>
      { user?.role_id === 1 && (
        <>
          <td style={{ textAlign: "center" }}>
            <Button
              as={Link}
              href={`/specs/edit/${spec?.id}`}
              variant="warning"
              className="me-2"
            >
              Update
            </Button>
            <Button as={Link} href={`/specs/${spec?.id}`} variant="danger">
              Delete
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

SpecItem.propTypes = {
  spec: PropTypes.object.isRequired,
};

export default SpecItem;
