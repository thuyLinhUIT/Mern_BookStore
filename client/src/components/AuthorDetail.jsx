// import React from "react";
import { useLoaderData } from "react-router-dom";
// import { useState } from "react";

const AuthorDetail = () => {
  const { authorName, imageURL, authorBio } = useLoaderData();

  return (
    <div
      className="bg-white mt-10 ml-10 lg:flex lg:space-x-8"
      style={{ margin: "150px" }}
    >
      <section
        // className="minHeight:100"
        style={{ minHeight: "100vh", backgroundColor: "white" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-10 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom d-flex align-items-center justify-content-center text-white"
                    style={{
                      borderRadius: ".5rem",
                      height: "100%",
                      zIndex: "0",
                    }}
                  >
                    <img
                      src={imageURL}
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4 d-flex flex-column justify-content-center">
                      <h2>{authorName}</h2>
                      <h6 className="mb-4">Thông tin tác giả</h6>
                      <p>{authorBio}</p>
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <i className="fab fa-facebook-f fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-twitter fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-instagram fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AuthorDetail;
