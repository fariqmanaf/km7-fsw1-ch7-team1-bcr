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
import { createCar } from "../../../service/cars";
import { getOptions } from "../../../service/options";
import { getSpecs } from "../../../service/spec";
import { MultiSelect } from "react-multi-select-component";
import { FileUploader } from "react-drag-drop-files";
import {
    setAvailabilityState,
    setDetailsCar,
    setModelsState,
    setOptionsState,
    setSpecsState,
} from "../../../redux/slices/car_details";
import { setSuccess } from "../../../redux/slices/success";
import Protected from "../../../components/Auth/Protected";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/cars/next-create")({
    component: () => (
        <Protected roles={[1]}>
            <NextCreateComponent />
        </Protected>
    ),
});

function NextCreateComponent() {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const imageRef = useRef(null);
    const fileTypes = ["JPG", "PNG", "GIF"];

    const user = useSelector((state) => state.auth.user);
    const success = useSelector((state) => state.success.success);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const carDetailsState = useSelector(
        (state) => state.car_details.carDetails
    );
    const availabilityState = useSelector(
        (state) => state.car_details.availability
    );
    const modelsState = useSelector((state) => state.car_details.models);
    const optionsState = useSelector((state) => state.car_details.options);
    const specsState = useSelector((state) => state.car_details.specs);

    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(
        carDetailsState?.url_image || null
    );
    const [options, setOptions] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [formOptions, setFormOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(optionsState || []);
    const [formSpecs, setFormSpecs] = useState([]);
    const [selectedSpecs, setSelectedSpecs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxSelection = 3;

    const {
        data: optionsData,
        isSuccess: isOptionSuccess,
        isError: isOptionError,
    } = useQuery({
        queryKey: ["options"],
        queryFn: () => getOptions(),
    });

    const {
        data: specsData,
        isSuccess: isSpecSuccess,
        isError: isSpecError,
    } = useQuery({
        queryKey: ["specs"],
        queryFn: () => getSpecs(),
    });

    const { mutate: createCarMutation } = useMutation({
        mutationFn: (formData) => createCar(formData),
        onSuccess: (data) => {
            if (data?.success === true) {
                dispatch(setModelsState(null));
                dispatch(setOptionsState(null));
                dispatch(setSpecsState(null));
                dispatch(setDetailsCar(null));
                dispatch(setAvailabilityState(null));
                toast.success("Your Car Data Has Been Created!");
                dispatch(setSuccess(true));
            } else {
                toast.error(data?.message);
            }
        },
        onError: (error) => {
            toast.error(error?.message);
        },
        onMutate: () => {
            setIsLoading(true);
        },
        onSettled: () => {
            setIsLoading(false);
        },
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
    }, [isLoading]);

    useEffect(() => {
        setFormSpecs(
            specs.map((spec) => ({
                label: spec.spec,
                value: spec.id,
            }))
        );
        if (specsState !== null) {
            setSelectedSpecs(specsState);
        }
    }, [specs]);

    useEffect(() => {
        setFormOptions(
            options.map((option) => ({
                label: option.option,
                value: option.id,
            }))
        );
        if (optionsState !== null) {
            setSelectedOptions(optionsState);
        }
    }, [options]);

    useEffect(() => {
        if (success) {
            navigate({ to: `/admin/cars` });
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

    function onClickBack() {
        dispatch(setModelsState(modelsState));
        dispatch(setOptionsState(selectedOptions));
        dispatch(setSpecsState(selectedSpecs));
        dispatch(
            setDetailsCar({
                ...carDetailsState,
                url_image: imageURL,
            })
        );
        navigate({ to: `/admin/cars/create` });
    }

    const scrollContainerStyle = {
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    };

    const onClickForm = () => {
        if (carDetailsState === null) {
            return toast.error(
                "Your Progress Has Been Lost, Please Start Again!"
            );
        }

        if (selectedOptions.length < 3) {
            return toast.error("Please select at least 3 options!");
        }
        if (selectedSpecs.length < 3) {
            return toast.error("Please select at least 3 specs!");
        }

        const formData = new FormData();
        formData.append("plate", carDetailsState.plate);
        formData.append("manufacture_id", carDetailsState.manufacture_id);
        formData.append("year", carDetailsState.year);
        formData.append("capacity", carDetailsState.capacity);
        formData.append("description", carDetailsState.description);
        formData.append("transmission", carDetailsState.transmission);
        formData.append("model", modelsState.model);
        formData.append("type", modelsState.type);
        formData.append("image", file);
        selectedOptions.map((option) =>
            formData.append("option_details_id", parseInt(option.value))
        );
        selectedSpecs.map((spec) =>
            formData.append("spec_details_id", parseInt(spec.value))
        );
        formData.append("rentPerDay", availabilityState.rent_perday);
        formData.append("availableAt", availabilityState.available_at);
        formData.append("available", availabilityState.available);

        createCarMutation(formData);
    };

    const handleChangeOptions = (selected) => {
        if (selected.length <= maxSelection) {
            setSelectedOptions(selected);
        } else {
            toast.error(`You can only select ${maxSelection} options!`);
        }
        dispatch(setOptionsState(selected));
    };

    const handleChangeSpecs = (selected) => {
        if (selected.length <= maxSelection) {
            setSelectedSpecs(selected);
        } else {
            toast.error(`You can only select ${maxSelection} specs!`);
        }
        dispatch(setSpecsState(selected));
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
                    {imageURL === null ? (
                        <div className="d-flex flex-column justify-content-center align-content-center">
                            <h6 className="text-center">
                                Your Image Will Be Displayed In Here
                            </h6>
                        </div>
                    ) : (
                        <Image
                            src={imageURL || ""}
                            fluid
                            className="object-fit-cover"
                            style={{ borderRadius: "1rem" }}
                        />
                    )}
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
                    <h3 className="mb-4 text-center fw-bold">Create Cars</h3>

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
                            onChange={handleChangeOptions}
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
                            onChange={handleChangeSpecs}
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
                            Create
                        </Button>
                    )}
                </Form>
            </Col>
        </Row>
    );
}
