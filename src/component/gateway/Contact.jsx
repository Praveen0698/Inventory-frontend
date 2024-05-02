import "../../PrivacyPolicyPage.css";
import React, { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import SideBar from "../SideBar";
import NavBar from "../NavBar";

import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [side, setSide] = useState(false);
  const [navClick, setNavClick] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
        <div className="layout-1">
          <SideBar navClick={navClick} side={side} />
          {/* start: body area */}
          <div className="wrapper">
            {/* start: page header */}
            <NavBar
              navClick={navClick}
              setNavClick={setNavClick}
              side={side}
              setSide={setSide}
            />
            <div className="">
              <div className="privacy-policy-container">
                <h1>Contact Us</h1>

                <div className="privacy-policy-content">
                  <h3>Complaints</h3>
                  <p>
                    If you have complaints about how we process your personal
                    information, please contact us using the contact details
                    provided below. If you are not satisfied with our response
                    to your complaint, depending on where you live you may have
                    the right to appeal our decision by contacting us using the
                    contact details set out below, or lodge your complaint with
                    your local data protection authority.
                  </p>
                </div>
                <div className="privacy-policy-content">
                  <h3>Non-Personal identification information</h3>
                  <p>
                    InstaEmart may collect non-personal identification
                    information about Users whenever they interact with our
                    Software. Non-personal identification information may
                    include the browser name, the type of computer, and
                    technical information about Users' means of connection to
                    our Software, such as the operating system and the Internet
                    service providers utilized and other similar information.
                  </p>
                </div>
                <div className="privacy-policy-content">
                  <h3>Third Party Websites and Links</h3>
                  <p>
                    Our Site may provide links to websites or other online
                    platforms operated by third parties. If you follow links to
                    sites not affiliated or controlled by us, you should review
                    their privacy and security policies and other terms and
                    conditions. We do not guarantee and are not responsible for
                    the privacy or security of such sites, including the
                    accuracy, completeness, or reliability of information found
                    on these sites. Information you provide on public or
                    semi-public venues, including information you share on
                    third-party social networking platforms may also be viewable
                    by other users of the Services and/or users of those
                    third-party platforms without limitation as to its use by us
                    or by a third party. Our inclusion of such links does not,
                    by itself, imply any endorsement of the content on such
                    platforms or of their owners or operators, except as
                    disclosed on the Services.
                  </p>
                </div>
                <div className="privacy-policy-content">
                  <h3>Security and Retention of Your Information</h3>
                  <p>
                    Please be aware that no security measures are perfect or
                    impenetrable, and we cannot guarantee “perfect security.” In
                    addition, any information you send to us may not be secure
                    while in transit. We recommend that you do not use unsecure
                    channels to communicate sensitive or confidential
                    information to us. How long we retain your personal
                    information depends on different factors, such as whether we
                    need the information to maintain your account, to provide
                    the Services, comply with legal obligations, resolve
                    disputes or enforce other applicable contracts and policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
