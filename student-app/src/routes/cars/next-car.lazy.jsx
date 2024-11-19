import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { IoArrowBackCircle } from "react-icons/io5";
import gsap from "gsap";
import { getDetailCar } from "../../service/cars";
import { getOptions } from "../../service/options";
import { getSpecs } from "../../service/spec";
import { MultiSelect } from "react-multi-select-component";
import { FileUploader } from "react-drag-drop-files";
import {
    setModelsState,
    setOptionsState,
    setSpecsState,
} from "../../redux/slices/car_details";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/cars/next-car")({
    component: NextForm,
});

function NextForm() {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const imageRef = useRef(null);
    const fileTypes = ["JPG", "PNG", "GIF"];
    const user = useSelector((state) => state.auth.user);

    const success = useSelector((state) => state.success.success);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("carId");

    const modelsState = useSelector((state) => state.car_details.models);
    const optionsState = useSelector((state) => state.car_details.options);
    const specsState = useSelector((state) => state.car_details.specs);

    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [options, setOptions] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [userOptions, setuserOptions] = useState(optionsState || []);
    const [formOptions, setFormOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(optionsState || []);
    const [userSpecs, setUserSpecs] = useState(specsState || []);
    const [formSpecs, setFormSpecs] = useState([]);
    const [selectedSpecs, setSelectedSpecs] = useState([]);

    const {
        data: optionsData,
        isSuccess: isOptionSuccess,
        isError: isOptionError,
    } = useQuery({
        queryKey: ["options"],
        queryFn: () => getOptions(),
        enabled: !!id,
    });

    const {
        data: specsData,
        isSuccess: isSpecSuccess,
        isError: isSpecError,
    } = useQuery({
        queryKey: ["specs"],
        queryFn: () => getSpecs(),
        enabled: !!id,
    });

    const {
        data: detailCarData,
        isPending: isCarsPending,
        isSuccess: isCarsSuccess,
        isError: isCarsError,
    } = useQuery({
        queryKey: ["detailCar", id],
        queryFn: () => getDetailCar(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (isOptionSuccess) {
            setOptions(optionsData?.data);
        }
        if (isOptionError) {
            toast.error("Failed to get options data!");
        }
    }, [optionsData, isOptionSuccess, isOptionError]);

    useEffect(() => {
        if (isSpecSuccess) {
            setSpecs(specsData?.data);
        }
        if (isSpecError) {
            toast.error("Failed to get specs data!");
        }
    }, [specsData, isSpecSuccess, isSpecError]);

    useEffect(() => {
        if (isCarsSuccess) {
            {
                if (modelsState === null) {
                    dispatch(setModelsState(detailCarData.data?.models));
                } else {
                    dispatch(setModelsState(modelsState));
                }
            }
            setuserOptions(detailCarData.data?.options);
            setUserSpecs(detailCarData.data?.specs);
            setImageURL(detailCarData.data?.car_details[0]?.image);
        }
        if (isCarsError) {
            toast.error("Failed to get car data!");
        }
    }, [detailCarData, isCarsError, isCarsSuccess]);

    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.set(containerRef.current, { opacity: 0 });
            gsap.set(imageRef.current, { opacity: 0, y: 50 });
            gsap.set(formRef.current, { opacity: 0, y: 50 });

            gsap.to(containerRef.current, {
                duration: 1,
                opacity: 1,
                ease: "power3.inOut",
            });
            gsap.to(imageRef.current, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power3.inOut",
            });
            gsap.to(formRef.current, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power3.inOut",
            });
        }, containerRef);
    }, [isCarsPending]);

    useEffect(() => {
        setFormSpecs(
            specs.map((spec) => ({
                label: spec.spec,
                value: spec.id,
            }))
        );
        if (userSpecs) {
            setSelectedSpecs(
                userSpecs.map((spec) => ({
                    label: spec.spec_details?.spec,
                    value: spec.spec_details?.id,
                }))
            );
        }
    }, [specs, userSpecs]);

    useEffect(() => {
        setFormOptions(
            options.map((option) => ({
                label: option.option,
                value: option.id,
            }))
        );
        if (userOptions) {
            setSelectedOptions(
                userOptions.map((option) => ({
                    label: option.option_details?.option,
                    value: option.option_details?.id,
                }))
            );
        }
    }, [options, userOptions]);

    useEffect(() => {
        if (success) {
            const carId = localStorage.getItem("carId");
            localStorage.removeItem("carId");
            navigate({ to: `/admin/cars/${carId}` });
        }
    }, [success]);

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

    if (isCarsPending) {
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

    function onClickBack() {
        dispatch(setModelsState(modelsState));
        dispatch(setOptionsState(userOptions));
        dispatch(setSpecsState(userSpecs));
        navigate({ to: `/cars/${id}` });
    }

    const scrollContainerStyle = {
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    };

    return (
        <Row
            className="d-flex flex justify-content-center align-items-center"
            ref={containerRef}
            style={{
                height: "90vh",
                ...scrollContainerStyle,
                WebkitOverflowScrolling: "touch",
                WebkitScrollbar: { display: "none" },
            }}
        >
            <IoArrowBackCircle
                className="position-absolute"
                role="button"
                onClick={onClickBack}
                style={{
                    color: "#0d6efd",
                    width: "7vw",
                    height: "7vh",
                    top: "6rem",
                    left: "7rem",
                }}
            />
            <Col
                md={5}
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                    height: "100%",
                    padding: "1rem",
                }}
            >
                <div
                    ref={imageRef}
                    className="ratio ratio-1x1"
                    style={{
                        maxWidth: "25rem",
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "1rem",
                    }}
                >
                    <Image
                        src={imageURL}
                        fluid
                        className="object-fit-cover"
                        alt="Car Image"
                        style={{ borderRadius: "1rem" }}
                    />
                </div>
                <p
                    className="w-75 text-center mt-1"
                    style={{ fontSize: "0.8rem" }}
                >
                    *Image will be changed if you're uploading a new file!
                </p>
            </Col>

            <Col
                md={5}
                className="d-flex justify-content-center align-items-center"
            >
                <Form
                    style={{ width: "100%", maxWidth: "400px" }}
                    className="d-flex gap-2 flex-column"
                    ref={formRef}
                >
                    <h3 className="mb-4 text-center fw-bold">Car Details</h3>

                    <Form.Group
                        controlId="availability"
                        className="d-flex gap-2"
                    >
                        <div style={{ width: "50%" }}>
                            <Form.Label>Models</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={user.role_id === 2}
                                placeholder="Your Car Model"
                                defaultValue={
                                    modelsState === null
                                        ? ""
                                        : modelsState.model
                                }
                                onChange={(event) =>
                                    dispatch(
                                        setModelsState({
                                            ...modelsState,
                                            model: event.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={user.role_id === 2}
                                placeholder="Your Car Type"
                                defaultValue={
                                    modelsState === null ? "" : modelsState.type
                                }
                                onChange={(event) =>
                                    dispatch(
                                        setModelsState({
                                            ...modelsState,
                                            type: event.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Options</Form.Label>
                        <MultiSelect
                            options={formOptions}
                            value={selectedOptions}
                            labelledBy="Select"
                        />
                        <p style={{ fontSize: "0.7rem", margin: "0" }}>
                            *click to see details
                        </p>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Specs</Form.Label>
                        <MultiSelect
                            options={formSpecs}
                            value={selectedSpecs}
                            labelledBy="Select"
                        />
                        <p style={{ fontSize: "0.7rem", margin: "0" }}>
                            *click to see details
                        </p>
                    </Form.Group>

                    {user?.role_id === 1 && (
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <FileUploader
                                handleChange={(file) => {
                                    setFile(file);
                                    setImageURL(URL.createObjectURL(file));
                                }}
                                name="file"
                                types={fileTypes}
                            />
                        </Form.Group>
                    )}

                    {user?.role_id === 1 && (
                        <Button
                            variant="primary"
                            type="button"
                            className="w-100 mt-2"
                            onClick={onClickForm}
                        >
                            Update
                        </Button>
                    )}
                </Form>
            </Col>
        </Row>
    );
}
