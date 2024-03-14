import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "black" }}
    >
      <MDBContainer className="p-4">
        <section className="">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol lg="6">
              <div className="ratio ratio-16x9">
                <iframe
                  className="shadow-1-strong rounded"
                  src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&amp;origin=https%3A%2F%2Fmdbootstrap.com"
                  title="YouTube video"
                  allowFullScreen
                  data-gtm-yt-inspected-2340190_699="true"
                  id="388567449"
                ></iframe>
              </div>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3 border"
        style={{ backgroundColor: "black" }}
      >
        ©  MJN COLLECTION 
        <a className="text-white" href="https://mdbootstrap.com/">
          ...
        </a>
      </div>
    </MDBFooter>
  );
}
