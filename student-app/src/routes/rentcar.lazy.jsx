
import { createLazyFileRoute } from "@tanstack/react-router";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Route = createLazyFileRoute("/rentcar")({
  component: RentCar,
});

function RentCar() {

  return (
    <>
      <div>
        <UserNavbar />
      </div>
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
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
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
                  <label htmlFor="rentalDate">Tanggal Penyewaan</label>
                  <input
                    type="date"
                    className="form-control"
                    id="rentalDate"
                    name="rentalDate"
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group mx-2">
                  <label htmlFor="pickupTime">Waktu Jemput/Ambil</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      id="pickupTime"
                      name="pickupTime"
                    >
                      <option value="">Pilih Waktu</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="form-group mx-2">
                  <label htmlFor="passengerCount">Jumlah Penumpang</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="passengerCount"
                      name="passengerCount"
                      placeholder="0"
                      required
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
                  <button
                    type="submit"
                    className="btn custom-button"
                    id="search-btn"
                    // disabled={!formData.driverType || !formData.rentalDate}
                  >
                    Cari Mobil
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
      <div>
        {/* Cars Content Section */}
        <div className="container custom-carscontent">
          <div className="row d-flex" id="cars-content"></div>
        </div>

        {/* Footer Section */}
        <div className="container py-5">
          <div className="row">
            {/* Address Column */}
            <div className="col-lg-3 col-md-6 col-12 address-column">
              <div className="row">
                <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
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
