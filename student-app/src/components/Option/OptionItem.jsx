import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "@tanstack/react-router";

const OptionItem = ({ option, user }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{option?.id}</td>
      <td>{option?.option}</td>
      {user && user?.role_id === 1 && (
        <>
          <td style={{ textAlign: "center" }}>
            <Button
              as={Link}
              href={`/options/edit/${option?.id}`}
              variant="warning"
              className="me-2"
            >
              Update
            </Button>
            <Button as={Link} href={`/options/${option?.id}`} variant="danger">
              Delete
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

OptionItem.propTypes = {
  option: PropTypes.object.isRequired,
};

export default OptionItem;
