import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div>
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
            <div>
              <button
                type="button"
                className="btn text-white"
                style={{
                  backgroundColor: "#5cb85f",
                  marginTop: "8px",
                  width: "fit-content",
                }}
              >
                Mulai Sewa Mobil
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="../public/assets/images/landing/img_car.png"
              className="img-fluid"
              alt="Mercedes"
              style={{ marginTop: "16px" }}
            />
          </div>
        </div>
      </div>
      <div id="ourservices" className="container">
        <div className="row">
          {/* Left column */}
          <div className="col-md-6 d-flex justify-content-center my-5">
            <img
              src="../public/assets/images/landing/img_service.png"
              className="img-fluid"
              alt="ourservice"
            />
          </div>

          {/* Right column */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 style={{ marginBottom: "24px" }}>
              Best Car Rental for any kind of trip in (Lokasimu)!
            </h2>
            <p style={{ textAlign: "justify" }}>
              Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>

            {/* List of Services */}
            {[
              "Sewa Mobil Dengan Supir di Bali 12 Jam",
              "Sewa Mobil Lepas Kunci di Bali 24 Jam",
              "Sewa Mobil Jangka Panjang Bulanan",
              "Gratis Antar - Jemput Mobil di Bandara",
              "Layanan Airport Transfer / Drop In Out",
            ].map((service, index) => (
              <p key={index}>
                <img
                  src="../public/assets/images/landing/checklist.png"
                  alt="check"
                  style={{ marginRight: "8px" }}
                />
                {service}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div id="whyus" className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center text-md-start">
            <h2>Why Us?</h2>
          </div>
          <div className="col-md-12 text-center text-md-start">
            <p>Mengapa harus pilih Binar Car Rental?</p>
          </div>

          {/* Card data */}
          {[
            {
              imgSrc: "../public/assets/images/landing/icon_complete.png",
              title: "Mobil Lengkap",
              text: "Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat",
            },
            {
              imgSrc: "../public/assets/images/landing/icon_price.png",
              title: "Harga Murah",
              text: "Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain",
            },
            {
              imgSrc: "../public/assets/images/landing/icon_24hrs.png",
              title: "Layanan 24 Jam",
              text: "Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu",
            },
            {
              imgSrc: "../public/assets/images/landing/icon_professional.png",
              title: "Sopir Profesional",
              text: "Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu",
            },
          ].map((card, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="card mx-auto" style={{ width: "18rem" }}>
                <div className="card-body">
                  <img
                    src={card.imgSrc}
                    alt={card.title}
                    style={{ marginBottom: "16px" }}
                  />
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        id="testimonial"
        className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h2>Testimonial</h2>
        <p>Berbagai review positif dari para pelanggaan kami</p>
      </div>
      <div
        className="container mb-5 p-5"
        style={{ backgroundColor: "#f1f3ff", borderRadius: "10px" }}
      >
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-inner">
            {/* First carousel item */}
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
                    <img
                      src="../public/assets/images/landing/carousel1.png"
                      className="img-fluid w-50"
                      alt="test"
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="row justify-content-center">
                      <div className="col-12 text-center">
                        <img
                          src="../public/assets/images/landing/Rate.png"
                          className="img-fluid w-25 mb-3"
                          alt="rate"
                        />
                        <p
                          style={{
                            textAlign: "justify",
                          }}
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Deserunt asperiores cupiditate doloremque iusto
                          explicabo, quia minus mollitia ratione nobis sapiente
                          commodi ea? Corrupti molestias porro explicabo facilis
                          dolorum officiis quisquam!
                        </p>
                        <h6>John Dee 32, Bromo</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second carousel item */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
                  <img
                    src="../public/assets/images/landing/carousel2.png"
                    className="img-fluid w-50"
                    alt="test"
                  />
                </div>
                <div className="col-12 col-md-8">
                  <div className="row justify-content-center">
                    <img
                      src="../public/assets/images/landing/Rate.png"
                      className="img-fluid w-25 mb-3"
                      alt="rate"
                    />
                    <p style={{ textAlign: "justify" }}>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Deserunt asperiores cupiditate doloremque iusto explicabo,
                      quia minus mollitia ratione nobis sapiente commodi ea?
                      Corrupti molestias porro explicabo facilis dolorum
                      officiis quisquam!
                    </p>
                    <h6>John Dee 32, Bromo</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Third carousel item */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
                  <img
                    src="../public/assets/images/landing/blackpink.jpg"
                    className="img-fluid w-50 rounded-circle"
                    alt="blackpink"
                  />
                </div>
                <div className="col-12 col-md-8">
                  <div className="row justify-content-center">
                    <img
                      src="../public/assets/images/landing/Rate.png"
                      className="img-fluid w-25 mb-3"
                      alt="rate"
                    />
                    <p style={{ textAlign: "justify" }}>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Deserunt asperiores cupiditate doloremque iusto explicabo,
                      quia minus mollitia ratione nobis sapiente commodi ea?
                      Corrupti molestias porro explicabo facilis dolorum
                      officiis quisquam!
                    </p>
                    <h6>John Dee 32, Bromo</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div
        id="gettingStarted"
        className="container mb-5 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#0d28a6",
          borderRadius: "13px",
          padding: "50px",
        }}
      >
        <div className="row gy-3 text-white text-center">
          <div className="col-md-12">
            <h1>Sewa Mobil di Lokasimu Sekarang</h1>
          </div>
          <div className="col-md-12">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis excepturi, blanditiis optio repudiandae, dolor
              obcaecati, voluptatem et fuga vitae suscipit minus facere quasi
              consectetur sapiente delectus eum amet ducimus doloribus.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn text-white"
              style={{
                backgroundColor: "#5cb85f",
                width: "fit-content",
              }}
            >
              Mulai Sewa Mobil
            </button>
          </div>
        </div>
      </div>
      {/* FAQ */}
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-5">
            <h3>
              <b>Frequently Asked Question</b>
            </h3>
            <h7>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h7>
          </div>
          <div class="col-lg-7">
            {/* Row 4 */}
            <div class="row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Apa saja syarat yang dibutuhkan?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div class="row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Berapa hari minimal sewa mobil lepas kunci?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div class="row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Berapa hari sebelumnya sabaiknya booking sewa mobil?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div class="row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFor"
                      aria-expanded="false"
                      aria-controls="collapseFor"
                    >
                      Apakah Ada biaya antar-jemput?
                    </button>
                  </h2>
                  <div
                    id="collapseFor"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div class="row">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Bagaimana jika terjadi kecelakaan
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="container py-5">
        <div className="row">
          {/* Address Column */}
          <div className="col-lg-3 col-md-6 col-12">
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

          {/* Navigation Column */}
          <div className="col-lg-3 col-md-6 col-12">
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
          <div className="col-lg-3 col-md-6 col-12 text-lg-start">
            <div className="row">
              <p>Connect with us</p>
            </div>
            <div className="row">
              <img
                src="../public/assets/images/landing/list item.png"
                alt="sosmed"
                className="img-fluid w-75 w-lg-100"
                style={{ marginBottom: "16px" }}
              />
            </div>
          </div>

          {/* Copyright Column */}
          <div className="col-lg-3 col-md-6 col-12 text-lg-start">
            <div className="row">
              <p>Copyright Binar 2024</p>
            </div>
            <div className="row">
              <img
                src="../public/assets/images/landing/logo binar.svg"
                alt="Binar"
                className="img-fluid w-50 w-lg-75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
