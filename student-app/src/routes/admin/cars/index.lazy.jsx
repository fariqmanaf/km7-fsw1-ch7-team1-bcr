import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { getCars, deleteCar } from "../../../service/cars";
import { IoCarSharp } from "react-icons/io5";
import ReactLoading from "react-loading";
import gsap from "gsap";

import { setSuccess } from "../../../redux/slices/success";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import {
    setDetailsCar,
    setAvailabilityState,
    setModelsState,
    setOptionsState,
    setSpecsState,
} from "../../../redux/slices/car_details";

export const Route = createLazyFileRoute("/admin/cars/")({
    component: Cars,
});

function Cars() {
    const dispatch = useDispatch();

    dispatch(setDetailsCar(null));
    dispatch(setAvailabilityState(null));

    const cardRef = useRef(null);
    const containerRef = useRef(null);

    const token = useSelector((state) => state.auth.token);
    const success = useSelector((state) => state.success.success);
    const user = useSelector((state) => state.auth.user);

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTransmission, setSelectedTransmission] = useState("all");

    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.set(cardRef.current, { opacity: 0, y: 50 });

            gsap.to(cardRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });
        }, containerRef);
    }, [isLoading]);

    useEffect(() => {
        dispatch(setDetailsCar(null));
        dispatch(setAvailabilityState(null));
        dispatch(setModelsState(null));
        dispatch(setOptionsState(null));
        dispatch(setSpecsState(null));
    }, [isLoading]);

    useEffect(() => {
        const getCarsData = async () => {
            setIsLoading(true);
            const result = await getCars();
            if (result.success) {
                setCars(result.data);
                setFilteredCars(result.data);
            }
            setIsLoading(false);
        };

        if (token) {
            getCarsData();
        }
    }, [token]);

    useEffect(() => {
        if (selectedTransmission === "all") {
            setFilteredCars(cars);
        } else {
            const filtered = cars.filter(
                (car) =>
                    car.car_details[0].transmission === selectedTransmission
            );
            setFilteredCars(filtered);
        }
    }, [selectedTransmission, cars]);

    if (success) {
        dispatch(setSuccess(false));
    }

    if (!token) {
        return (
            <Row
                style={{ height: "90vh" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Col>
                    <h4 className="text-center">
                        Please login first to get cars data!
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

    function onClickTransmission(transmission) {
        return () => {
            setSelectedTransmission(transmission);
        };
    }

    const onDelete = (id) => {
        confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure to do this?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        setIsLoading(true);
                        const result = await deleteCar(id);
                        if (result.success) {
                            const newCars = cars.filter((car) => car.id !== id);
                            setCars(newCars);
                            setFilteredCars(newCars);
                            setIsLoading(false);
                            toast.success("Car deleted successfully!");
                            return;
                        }

                        toast.error("Failed to delete car!");
                    },
                },
                {
                    label: "No",
                    onClick: () => "",
                },
            ],
        });
    };

    return (
        <Row className="mt-5" ref={containerRef}>
            <Row>
                <Col className="d-flex justify-content-between px-5 mb-4">
                    <Row>
                        <h3>List Cars</h3>
                    </Row>
                    {user?.role_id === 1 && (
                        <Button
                            as={Link}
                            href={`/admin/cars/create`}
                            style={{
                                transition: "all 0.3s",
                                backgroundColor: "#0d6efd",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "transparent")(
                                    (e.currentTarget.style.color = "#0d6efd")
                                )
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#0d6efd")(
                                    (e.currentTarget.style.color = "white")
                                )
                            }
                        >
                            + Add Cars
                        </Button>
                    )}
                </Col>
            </Row>
            <Col className="d-flex flex-row px-5 mb-4 gap-2">
                <Button
                    onClick={onClickTransmission("all")}
                    className="border border-primary"
                    style={{
                        transition: "all 0.3s",
                        backgroundColor:
                            selectedTransmission === "all"
                                ? "#0d6efd"
                                : "transparent",
                        color:
                            selectedTransmission === "all"
                                ? "#FFFFFF"
                                : "#0d6efd",
                    }}
                >
                    All
                </Button>
                <Button
                    onClick={onClickTransmission("Manual")}
                    className="border border-primary"
                    style={{
                        transition: "all 0.3s",
                        backgroundColor:
                            selectedTransmission === "Manual"
                                ? "#0d6efd"
                                : "transparent",
                        color:
                            selectedTransmission === "Manual"
                                ? "#FFFFFF"
                                : "#0d6efd",
                    }}
                >
                    Manual
                </Button>
                <Button
                    onClick={onClickTransmission("Automatic")}
                    className="border border-primary"
                    style={{
                        transition: "all 0.3s",
                        backgroundColor:
                            selectedTransmission === "Automatic"
                                ? "#0d6efd"
                                : "transparent",
                        color:
                            selectedTransmission === "Automatic"
                                ? "#FFFFFF"
                                : "#0d6efd",
                    }}
                >
                    Automatic
                </Button>
            </Col>
            <Row className="px-5" ref={cardRef}>
                <Col>
                    <Row>
                        {filteredCars.length !== 0 &&
                            filteredCars.map((car) => (
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
                                                {user?.role_id === 1 && (
                                                    <Button
                                                        className="bg-transparent text-danger border border-danger fw-semibold d-flex justify-content-center align-content-center"
                                                        onClick={() =>
                                                            onDelete(car.id)
                                                        }
                                                        id={car.id}
                                                        style={{
                                                            height: "2.5rem",
                                                            transition:
                                                                "all 0.3s",
                                                            width: "50%",
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
                                                        <span>
                                                            <Image
                                                                src="/icons/trash.svg"
                                                                alt="trash--v1"
                                                                style={{
                                                                    height: "1rem",
                                                                    width: "1rem",
                                                                }}
                                                                className="me-1"
                                                            />
                                                        </span>
                                                        <p>Delete</p>
                                                    </Button>
                                                )}
                                                <Button
                                                    as={Link}
                                                    href={`/cars/${car.id}`}
                                                    className="text-white fw-semibold d-flex justify-content-center align-content-center"
                                                    style={{
                                                        height: "2.5rem",
                                                        transition: "all 0.3s",
                                                        color: "#0d6efd",
                                                        border: "1px solid #0d6efd",
                                                        width:
                                                            user?.role_id === 1
                                                                ? "50%"
                                                                : "100%",
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
                        {filteredCars.length === 0 && (
                            <Col className="align-self-center">
                                <h3>No Cars Available</h3>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Row>
    );
}
