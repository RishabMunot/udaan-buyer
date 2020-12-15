import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mark from "../../data/marker2.svg";
import mark2 from "../../data/marker4.png";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 19.238569170504515,
    longitude: 73.1416105851531,
    width: "55vw",
    height: "90vh",
    zoom: 10,
  });

  var history = useHistory()
  const [userId, setUserId] = useState(0);

  const [sellerData, setSellerData] = useState([]);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-all-sellers");
    setSellerData(res.data);
  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  const [selectedPark, setSelectedPark] = useState(null);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoicHJhdGlrODMwIiwiYSI6ImNraWVjZDNoNDEwanAyc3BvdjVpaHQ3NW4ifQ.GAy6fTNq4FzJdTzeeO0nvg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker latitude={19.238569170504515} longitude={73.1416105851531}>
          <img src={mark2} alt="" />
        </Marker>
        {sellerData.map((userData) => {
          if (userData.latitude && userData.longitude)
            return (
              <Marker
                key={userData.email}
                latitude={userData.latitude}
                longitude={userData.longitude}
              >
                <img
                  src={mark}
                  alt=""
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPark(userData);
                  }}
                />

                {}
              </Marker>
            );
          return <></>;
        })}

        {selectedPark ? (
          <Popup
            latitude={parseFloat(selectedPark.latitude, 10)}
            longitude={parseFloat(selectedPark.longitude, 10)}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h6>{selectedPark.firstName + " " + selectedPark.lastName}</h6>
              {/* <Button color="link"></Button> */}
              {/* <p> View his Profile</p> */}
              <Button color="link" onClick={toggle}>
                View his Profile
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                  <aside className="col-m-7">
                    <article className="card-body p-5">
                      <h3 className="title mb-3">
                        {selectedPark.firstName + " " + selectedPark.lastName}
                      </h3>

                      <dl className="item-property">
                        <h5>Contact Details</h5>
                        <dd></dd>
                      </dl>
                      <dl className="param param-feature">
                        <dt>Email</dt>
                        <dd className="text-capitalize">
                          {selectedPark.email}
                        </dd>
                      </dl>
                      <dl className="param param-feature">
                        <dt>Contact Number</dt>
                        <dd>{selectedPark.contactNumber}</dd>
                      </dl>
                      <dl className="param param-feature">
                        <dt>Address</dt>
                        <dd>
                          {selectedPark.address1 +
                            " ," +
                            selectedPark.address2 +
                            " ," +
                            selectedPark.addressCity +
                            " ," +
                            selectedPark.addressState +
                            " ," +
                            selectedPark.addressZip}
                        </dd>
                      </dl>
                    </article>
                  </aside>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={()=>history.push(`/product-of-seller/${selectedPark.firstName}_${selectedPark.lastName}`)}>
                    View Products
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
