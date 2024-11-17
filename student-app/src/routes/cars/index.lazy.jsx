import {
    createLazyFileRoute,
    useSearch,
    Link,
    useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ReactLoading from "react-loading";
import { getCarsByQueryParams } from "../../service/cars";
import { IoCarSharp } from "react-icons/io5";

export const Route = createLazyFileRoute("/cars/")({
    component: SearchCars,
});

function SearchCars() {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [capacity, setCapacity] = useState(0);
    const [availableAt, setAvailableAt] = useState("");
    const [transmission, setTransmission] = useState("");
    const search = useSearch({ from: "/cars/" });

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (capacity > 0) {
            queryParams.append("capacity", capacity);
        }
        if (availableAt !== "") {
            queryParams.append("availableAt", availableAt);
        }
        if (transmission !== "") {
            queryParams.append("transmission", transmission);
        }

        if (
            !search?.capacity &&
            !search?.availableAt &&
            !search?.transmission
        ) {
            setCars([]);
            return;
        }

        const searchingCars = async () => {
            setIsLoading(true);
            const result = await getCarsByQueryParams(queryParams);
            console.log(result);
            {
                result.success ? setCars(result.data) : setCars([]);
            }
            setIsLoading(false);
        };

        searchingCars();
    }, [search]);

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

    return (
        <>
            <div id="mainsection" className="container">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 style={{ marginTop: "8px", marginBottom: "8px" }}>
                            Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
                        </h1>
                        <p
                            style={{
                                marginTop: "8px",
                                marginBottom: "8px",
                                textAlign: "justify",
                            }}
                        >
                            Selamat datang di Binar Car Rental. Kami menyediakan
                            mobil kualitas terbaik dengan harga terjangkau.
                            Selalu siap melayani kebutuhanmu untuk sewa mobil
                            selama 24 jam.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="/assets/images/img_car.png"
                            className="img-fluid"
                            alt="Mercedes"
                            style={{ marginTop: "16px" }}
                        />
                    </div>
                </div>
            </div>
            <div
                className=" container card mx-auto shadow py-3 floating-form"
                style={{
                    marginTop: "-30px",
                    marginBottom: "-30px",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <div className="card-body">
                    <form
                        id="carRentalForm"
                        className="d-flex justify-content-center flex-wrap"
                    >
                        <Row>
                            <Col>
                                <div className="form-group mx-2">
                                    <label htmlFor="rentalDate">
                                        Tanggal Penyewaan
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="rentalDate"
                                        name="rentalDate"
                                        onChange={(e) => {
                                            setAvailableAt(e.target.value);
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group mx-2">
                                    <label htmlFor="transmission">
                                        Transmission
                                    </label>
                                    <div className="input-group">
                                        <Form.Select
                                            className="form-control"
                                            id="transmission"
                                            name="transmission"
                                            onChange={(e) => {
                                                setTransmission(e.target.value);
                                            }}
                                        >
                                            <option disabled selected>
                                                Transmission
                                            </option>
                                            <option value="Manual">
                                                Manual
                                            </option>
                                            <option value="Automatic">
                                                Automatic
                                            </option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group mx-2">
                                    <label htmlFor="passengerCount">
                                        Jumlah Penumpang
                                    </label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="number"
                                            className="form-control"
                                            id="passengerCount"
                                            name="passengerCount"
                                            placeholder="0"
                                            onChange={(e) => {
                                                setCapacity(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                        />

                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fas fa-users"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group d-flex align-items-end mx-2">
                                    <Button
                                        type="button"
                                        className="btn custom-button border-1 border mt-3"
                                        id="search-btn"
                                        as={Link}
                                        to={`/cars`}
                                        search={(() => {
                                            const searchParams = {};

                                            if (capacity > 0) {
                                                searchParams.capacity =
                                                    capacity;
                                            }
                                            if (availableAt) {
                                                searchParams.availableAt =
                                                    availableAt;
                                            }
                                            if (transmission) {
                                                searchParams.transmission =
                                                    transmission;
                                            }

                                            return searchParams;
                                        })()}
                                    >
                                        Cari Mobil
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
            <div>
                {/* Cars Content Section */}
                <div className="container custom-carscontent mt-5">
                    <div className="row d-flex" id="cars-content">
                        {cars?.length !== 0 &&
                            cars.map((car) => (
                                <Col key={car.id} md={4}>
                                    <Card>
                                        <Card.Body
                                            className="d-flex flex-column p-4"
                                            style={{ fontSize: "0.9rem" }}
                                        >
                                            <div className="ratio ratio-1x1 mb-3">
                                                <Image
                                                    src={
                                                        car?.car_details[0]
                                                            ?.image
                                                    }
                                                    alt={car.name}
                                                    fluid
                                                    className="align-self-center object-fit-cover"
                                                />
                                            </div>
                                            <Card.Text className="fw-bold w-100">
                                                {car?.manufactures?.name}{" "}
                                                {car?.models?.model}{" "}
                                                {car?.availability
                                                    ?.available === true ? (
                                                    <span className="text-success fw-semibold ms-2">
                                                        (Available)
                                                    </span>
                                                ) : (
                                                    <span className="text-danger fw-semibold ms-2">
                                                        (Not Available)
                                                    </span>
                                                )}
                                            </Card.Text>
                                            <Card.Text>
                                                <span className="fw-semibold">
                                                    Rp.{" "}
                                                    {
                                                        car.availability
                                                            ?.rent_perday
                                                    }{" "}
                                                    / hari
                                                </span>
                                            </Card.Text>
                                            <Card.Text>
                                                Transmission :{" "}
                                                <span className="fw-semibold">
                                                    {
                                                        car?.car_details[0]
                                                            ?.transmission
                                                    }
                                                </span>
                                            </Card.Text>
                                            <Card.Text>
                                                <span>Capacity: {"  "}</span>
                                                <span className="fw-semibold">
                                                    {
                                                        car.car_details[0]
                                                            ?.capacity
                                                    }{" "}
                                                    Person
                                                </span>
                                            </Card.Text>
                                            <Col className="d-flex gap-2">
                                                <Button
                                                    as={Link}
                                                    href={`/admin/cars/${car.id}`}
                                                    className="text-white fw-semibold d-flex justify-content-center align-content-center"
                                                    style={{
                                                        height: "2.5rem",
                                                        transition: "all 0.3s",
                                                        color: "#0d6efd",
                                                        border: "1px solid #0d6efd",
                                                        width: "100%",
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.transform =
                                                            "scale(1.03)")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.transform =
                                                            "scale(1)")
                                                    }
                                                >
                                                    <span className="me-1">
                                                        <IoCarSharp className="" />
                                                    </span>
                                                    <p>Detail</p>
                                                </Button>
                                            </Col>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        {cars.length === 0 && (
                            <Col className="align-self-center text-center">
                                <h3>No Cars Available, Search Another</h3>
                            </Col>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="container py-5">
                    <div className="row">
                        {/* Address Column */}
                        <div className="col-lg-3 col-md-6 col-12 address-column">
                            <div className="row">
                                <p>
                                    Jalan Suroyo No. 161 Mayangan Kota
                                    Probolonggo 672000
                                </p>
                            </div>
                            <div className="row">
                                <p>binarcarrental@gmail.com</p>
                            </div>
                            <div className="row">
                                <p>081-233-334-808</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 d-flex flex-column nav-column">
                            <a
                                className="nav-link text-black"
                                href="#ourservices"
                                style={{ marginBottom: "16px" }}
                            >
                                Our Services
                            </a>
                            <a
                                className="nav-link text-black"
                                href="#whyus"
                                style={{ marginBottom: "16px" }}
                            >
                                Why Us
                            </a>
                            <a
                                className="nav-link text-black"
                                href="#testimonial"
                                style={{ marginBottom: "16px" }}
                            >
                                Testimonial
                            </a>
                            <a
                                className="nav-link text-black"
                                href="#faq"
                                style={{ marginBottom: "16px" }}
                            >
                                FAQ
                            </a>
                        </div>

                        {/* Social Media Column */}
                        <div className="col-lg-3 col-md-6 col-12 d-flex flex-column socmedia-column">
                            <p>Connect with us</p>
                            <img
                                src="/assets/images/list item.png"
                                alt="sosmed"
                                className="img-fluid w-75 w-lg-100"
                                style={{ marginBottom: "16px" }}
                            />
                        </div>

                        {/* Copyright Column */}
                        <div className="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center">
                            <p>Copyright Binar 2024</p>
                            <img
                                src="/assets/images/logo binar.svg"
                                alt="Binar"
                                className="img-fluid w-50 w-lg-75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
