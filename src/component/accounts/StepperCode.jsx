import React, { useEffect, useState } from "react";

import InvForm from "./InvForm";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function StepperCode() {
  const [isLoading, setIsLoading] = useState(true);
  const [side, setSide] = useState(false);
  const [navClick, setNavClick] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const crossCheck = localStorage.getItem("cross");
    const expiryCheck = localStorage.getItem("expiryDate");
    if (!crossCheck) {
      if (expiryCheck) {
        navigation("/mpin");
      } else {
        navigation("/");
      }
    }
  }, []);
  return (
    <div>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Bars
            height="80"
            width="80"
            color="#40a1ed"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div id="stepper">
          <div className="layout-1">
            <SideBar navClick={navClick} side={side} />
            <div className="wrapper">
              <NavBar
                navClick={navClick}
                setNavClick={setNavClick}
                side={side}
                setSide={setSide}
              />

              <div className="overlay" style={{ background: "white" }}>
                <div style={{ padding: "20px 40px" }}>
                  <span style={{ color: "black", fontSize: "20px" }}>
                    E-Invoice Generate
                  </span>
                </div>
                <div>
                  <CssBaseline />
                  <Container component={Box} p={4}>
                    <Paper component={Box} p={3}>
                      <InvForm />
                    </Paper>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepperCode;
