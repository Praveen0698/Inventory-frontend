import React, { useEffect, useState } from "react";
import "../../Styles.css";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const InvForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [assval, setAssVal] = useState(0);
  const [cgstval, setCgstVal] = useState(0);
  const [sgstval, setSgstVal] = useState(0);
  const [igstval, setIgstVal] = useState(0);
  const [discountval, setDiscountVal] = useState(0);
  const [totalInvValFcval, setTotalInvValFcVal] = useState(0);
  const [cesval, setCesVal] = useState(0);
  const [stCesval, setStCesVal] = useState(0);

  const { state } = useLocation();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [formData, setFormData] = useState({
    Version: "1.1",
    Irn: null,
    TranDtls: {
      TaxSch: "GST",
      SupTyp: "",
      RegRev: "Y",
      EcmGstin: null,
      IgstOnIntra: "N",
    },
    DocDtls: {
      Typ: "",
      No: "",
      Dt: "",
    },
    SellerDtls: {
      Gstin: "",
      LglNm: "",
      TrdNm: "optional",
      Addr1: "",
      Addr2: "optional",
      Loc: "",
      Pin: 0,
      Stcd: "",
      Ph: 0,
      Em: "optional",
    },
    BuyerDtls: {
      Gstin: "",
      LglNm: "",
      TrdNm: "optional",
      Pos: "",
      Addr1: "",
      Addr2: "optional",
      Loc: "",
      Pin: 0,
      Stcd: "",
      Ph: 0,
      Em: "optional",
    },
    DispDtls: {
      Nm: "",
      Addr1: "",
      Addr2: "optional",
      Loc: "",
      Pin: 0,
      Stcd: "",
    },
    ShipDtls: {
      Gstin: "",
      LglNm: "",
      TrdNm: "optional",
      Addr1: "",
      Addr2: "optional",
      Loc: "",
      Pin: 0,
      Stcd: "",
    },
    ItemList: [
      {
        SlNo: "",
        PrdDesc: "",
        IsServc: "",
        HsnCd: "",
        Barcde: "",
        Qty: 0,
        FreeQty: 0,
        Unit: "",
        UnitPrice: 0,
        TotAmt: 0,
        Discount: 0,
        PreTaxVal: 0,
        AssAmt: 0,
        GstRt: 0,
        IgstAmt: 0,
        CgstAmt: 0,
        SgstAmt: 0,
        CesRt: 0,
        CesAmt: 0,
        CesNonAdvlAmt: 0,
        StateCesRt: 0,
        StateCesAmt: 0,
        StateCesNonAdvlAmt: 0,
        OthChrg: 0,
        TotItemVal: 0,
        OrdLineRef: "",
        OrgCntry: "",
        PrdSlNo: "",
      },
    ],
    ValDtls: {
      AssVal: 0,
      CgstVal: 0,
      SgstVal: 0,
      IgstVal: 0,
      CesVal: 0,
      StCesVal: 0,
      Discount: 0,
      OthChrg: 0,
      RndOffAmt: 0,
      TotInvVal: 0,
      TotInvValFc: 0,
    },
    PayDtls: {
      Nm: "optional",
      AccDet: 0,
      Mode: "optional",
      FinInsBr: "optional",
      PayTerm: "optional",
      PayInstr: "optional",
      CrTrn: "optional",
      DirDr: "optional",
      CrDay: 0,
      PaidAmt: 0,
      PaymtDue: 0,
    },
    EwbDtls: {
      TransId: "optional",
      TransName: "optional",
      TransMode: "",
      Distance: 0,
      TransDocNo: "optional",
      TransDocDt: "optional",
      VehNo: "optional",
      VehType: "optional",
    },
  });

  const handleTranInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      TranDtls: {
        ...prevState.TranDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleDocInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      DocDtls: {
        ...prevState.DocDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleSellerInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      SellerDtls: {
        ...prevState.SellerDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleBuyerInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      BuyerDtls: {
        ...prevState.BuyerDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleDispInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      DispDtls: {
        ...prevState.DispDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleShipInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      ShipDtls: {
        ...prevState.ShipDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handlePayInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      PayDtls: {
        ...prevState.PayDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleEwabInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      EwbDtls: {
        ...prevState.EwbDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleValInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      ValDtls: {
        ...prevState.ValDtls,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const [item, setItem] = useState([]);
  const [ID, setID] = useState("");

  const handleItemChange = (e, id) => {
    const updateData = item.map((elem) => {
      return elem.id === id
        ? {
            ...elem,
            [e.target.name]: e.target.value,
            ["TotItemVal"]: elem.UnitPrice,
            ["SlNo"]: item.length,
          }
        : elem;
    });
    setItem(updateData);
  };

  useEffect(() => {
    const calcAssVal = item.reduce((total, elem) => {
      return total + parseFloat(elem.AssAmt || 0);
    }, 0);
    const calcCgstVal = item.reduce((total, elem) => {
      return total + parseFloat(elem.CgstAmt || 0);
    }, 0);
    const calcSgstVal = item.reduce((total, elem) => {
      return total + parseFloat(elem.SgstAmt || 0);
    }, 0);
    const calcIgstVal = item.reduce((total, elem) => {
      return total + parseFloat(elem.IgstAmt || 0);
    }, 0);
    const calcDiscount = item.reduce((total, elem) => {
      return total + parseFloat(elem.Discount || 0);
    }, 0);
    const calcTotInvValFc = item.reduce((total, elem) => {
      return total + parseFloat(elem.TotItemVal || 0);
    }, 0);
    const calcCesVal = item.reduce((total, elem) => {
      return (
        total +
        parseFloat(elem.CesAmt || 0) +
        parseFloat(elem.CesNonAdvlAmt || 0)
      );
    }, 0);
    const calcStCesVal = item.reduce((total, elem) => {
      return (
        total +
        parseFloat(elem.StateCesAmt || 0) +
        parseFloat(elem.StateCesNonAdvlAmt || 0)
      );
    }, 0);
    setAssVal(calcAssVal);
    setCgstVal(calcCgstVal);
    setSgstVal(calcSgstVal);
    setIgstVal(calcIgstVal);
    setDiscountVal(calcDiscount);
    setTotalInvValFcVal(calcTotInvValFc);
    setCesVal(calcCesVal);
    setStCesVal(calcStCesVal);
  });

  useEffect(() => {
    const data = item.map((elem) => {
      let price = parseFloat(elem.UnitPrice) || 0;
      let qty = parseFloat(elem.Qty) || 0;
      let discount = parseFloat(elem.Discount) || 0;
      let igst = (price * qty - discount) * (parseFloat(elem.GstRt) / 100) || 0;
      let sgst =
        (price * qty - discount) * (parseFloat(elem.GstRt) / 2 / 100) || 0;
      let cgst =
        (price * qty - discount) * (parseFloat(elem.GstRt) / 2 / 100) || 0;
      let withoutGstAmt = price * qty;
      let calculatedAmount = elem.UnitPrice * qty + igst;
      let cessAmt =
        (price * qty - discount) * (parseFloat(elem.CesRt) / 100) || 0;
      let stateCesAmt =
        (price * qty - discount) * (parseFloat(elem.StateCesRt) / 100) || 0;
      if (calculatedAmount !== elem.TotItemVal) {
        return {
          ...elem,
          TotItemVal:
            calculatedAmount +
            cessAmt +
            stateCesAmt +
            parseFloat(elem.CesNonAdvlAmt) +
            parseFloat(elem.StateCesNonAdvlAmt),
          TotAmt: withoutGstAmt,
          IgstAmt: igst,
          CgstAmt: cgst,
          SgstAmt: sgst,
          AssAmt: withoutGstAmt - discount,
          StateCesAmt: stateCesAmt,
          CesAmt: cessAmt,
        };
      }
      return elem;
    });
    if (JSON.stringify(data) !== JSON.stringify(item)) {
      setItem(data);
    }

    setFormData({
      ...formData,
      ItemList: item,
    });
  }, [item]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ValDtls: {
        ...prevState.ValDtls,
        AssVal: assval,
        CgstVal: cgstval,
        SgstVal: sgstval,
        IgstVal: igstval,
        CesVal: cesval,
        StCesVal: stCesval,
        Discount: discountval,
        TotInvVal: totalInvValFcval + discountval,
        TotInvValFc: totalInvValFcval,
      },
    }));
  }, [
    assval,
    cgstval,
    igstval,
    cesval,
    stCesval,
    discountval,
    totalInvValFcval,
  ]);

  const deleteRow = (id) => {
    const updatedData = item.filter((elem) => {
      return elem.id !== id;
    });
    setItem(updatedData);
  };

  const addItem = () => {
    const newItem = {
      id: new Date().getTime().toString(),
      SlNo: "",
      PrdDesc: "",
      IsServc: "",
      HsnCd: "",
      Barcde: "",
      Qty: 0,
      FreeQty: 0,
      Unit: "",
      UnitPrice: 0,
      TotAmt: 0,
      Discount: 0,
      PreTaxVal: 0,
      AssAmt: 0,
      GstRt: 0,
      IgstAmt: 0,
      CgstAmt: 0,
      SgstAmt: 0,
      CesRt: 0,
      CesAmt: 0,
      CesNonAdvlAmt: 0,
      StateCesRt: 0,
      StateCesAmt: 0,
      StateCesNonAdvlAmt: 0,
      OthChrg: 0,
      TotItemVal: 0,
      OrdLineRef: "",
      OrgCntry: "",
      PrdSlNo: "",
    };
    setItem([...item, newItem]);
    setID(newItem.id);
  };

  function getSteps() {
    return [
      "Basic Details",
      "Seller Details",
      "Buyer Details",
      "Dispatch Details",
      "Shipping Details",
      "Item Details",
      "Value Details",
      "Payee Details",
      "E-Way Bill Details",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0: // BasicDtls
        return (
          <>
            <div className="data-input-fields">
              <div className="mb-2 w-50">
                <label htmlFor="SupTyp" className="form-label">
                  Code for Supply Type **
                </label>
                <select
                  className="form-select"
                  id="SupTyp"
                  name="SupTyp"
                  value={formData.TranDtls.SupTyp}
                  onChange={(e) => handleTranInput(e)}
                >
                  <option value="">Select Transaction Type</option>
                  <option value="B2B">B2B: Business to Business</option>
                  <option value="B2C">B2C: Business to Consumer</option>
                  <option value="SEZWP">SEZWP: To SEZ with Payment</option>
                  <option value="SEZWOP">SEZWOP: To SEZ without Payment</option>
                  <option value="EXPWP">EXPWP: Export with Payment</option>
                  <option value="EXPWOP">EXPWOP: Export without Payment</option>
                  <option value="DEXP">DEXP: Deemed Export</option>
                </select>
              </div>

              <div className="mb-2 w-50">
                <label htmlFor="Typ" className="form-label">
                  Document Type Code **
                </label>
                <select
                  className="form-select"
                  id="Typ"
                  name="Typ"
                  value={formData.DocDtls.Typ}
                  onChange={(e) => handleDocInput(e)}
                >
                  <option value="">Select Document Type</option>
                  <option value="INV">INV: Invoice</option>
                  <option value="CRN">CRN: Credit Note</option>
                  <option value="DBN">DBN: Debit Note</option>
                </select>
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="No" class="form-label">
                  Document Number **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="No"
                  value={formData.DocDtls.No}
                  onChange={(e) => handleDocInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Dt" class="form-label">
                  Document Date **
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="Dt"
                  aria-describedby="emailHelp"
                  name="Dt"
                  value={formData.DocDtls.Dt}
                  onChange={(e) => handleDocInput(e)}
                />
              </div>
            </div>
          </>
        );

      case 1: // SellerDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="LglNm" class="form-label">
                  Supplier Legal Name **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="LglNm"
                  aria-describedby="emailHelp"
                  name="LglNm"
                  value={formData.SellerDtls.LglNm}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TrdNm" class="form-label">
                  Supplier Trade Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TrdNm"
                  aria-describedby="emailHelp"
                  name="TrdNm"
                  value={formData.SellerDtls.TrdNm}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Gstin" class="form-label">
                  Supplier GSTIN **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Gstin"
                  aria-describedby="emailHelp"
                  name="Gstin"
                  value={formData.SellerDtls.Gstin}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Addr1" class="form-label">
                  Supplier Address 1 **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr1"
                  aria-describedby="emailHelp"
                  name="Addr1"
                  value={formData.SellerDtls.Addr1}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Addr2" class="form-label">
                  Supplier Address 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr2"
                  aria-describedby="emailHelp"
                  name="Addr2"
                  value={formData.SellerDtls.Addr2}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Loc" class="form-label">
                  Supplier Place **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Loc"
                  aria-describedby="emailHelp"
                  name="Loc"
                  value={formData.SellerDtls.Loc}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Stcd" class="form-label">
                  Supplier State Code **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Stcd"
                  aria-describedby="emailHelp"
                  name="Stcd"
                  value={formData.SellerDtls.Stcd}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Pin" class="form-label">
                  Supplier Pincode **
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Pin"
                  aria-describedby="emailHelp"
                  name="Pin"
                  value={formData.SellerDtls.Pin}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Ph" class="form-label">
                  Supplier Phone
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Ph"
                  aria-describedby="emailHelp"
                  name="Ph"
                  value={formData.SellerDtls.Ph}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Em" class="form-label">
                  Supplier Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="Em"
                  aria-describedby="emailHelp"
                  name="Em"
                  value={formData.SellerDtls.Em}
                  onChange={(e) => handleSellerInput(e)}
                />
              </div>
            </div>
          </>
        );
      case 2: // BuyerDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="LglNm" class="form-label">
                  Buyer Legal Name **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="LglNm"
                  aria-describedby="emailHelp"
                  name="LglNm"
                  value={formData.BuyerDtls.LglNm}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TrdNm" class="form-label">
                  Buyer Trade Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TrdNm"
                  aria-describedby="emailHelp"
                  name="TrdNm"
                  value={formData.BuyerDtls.TrdNm}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Gstin" class="form-label">
                  Buyer GSTIN **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Gstin"
                  aria-describedby="emailHelp"
                  name="Gstin"
                  value={formData.BuyerDtls.Gstin}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
              <div className="mb-2 w-50">
                <label htmlFor="Pos" className="form-label">
                  Place of Supply (State Code) **
                </label>
                <select
                  className="form-select"
                  id="Typ"
                  name="Pos"
                  value={formData.BuyerDtls.Pos}
                  onChange={(e) => handleBuyerInput(e)}
                >
                  <option value="">Select State</option>
                  <option value="01">01 - Jammu & Kashmir</option>
                  <option value="02">02 - Himachal Pradesh</option>
                  <option value="03">03 - Punjab</option>
                  <option value="04">04 - Chandigarh</option>
                  <option value="05">05 - Uttarakhand</option>
                  <option value="06">06 - Haryana</option>
                  <option value="07">07 - Delhi</option>
                  <option value="08">08 - Rajasthan</option>
                  <option value="09">09 - Uttar Pradesh</option>
                  <option value="10">10 - Bihar</option>
                  <option value="11">11 - Sikkim</option>
                  <option value="12">12 - Arunachal Pradesh</option>
                  <option value="13">13 - Nagaland</option>
                  <option value="14">14 - Manipur</option>
                  <option value="15">15 - Mizoram</option>
                  <option value="16">16 - Tripura</option>
                  <option value="17">17 - Meghalaya</option>
                  <option value="18">18 - Assam</option>
                  <option value="19">19 - West Bengal</option>
                  <option value="20">20 - Jharkhand</option>
                  <option value="21">21 - Orissa</option>
                  <option value="22">22 - Chhattisgarh</option>
                  <option value="23">23 - Madhya Pradesh</option>
                  <option value="24">24 - Gujarat</option>
                  <option value="25">25 - Daman & Diu</option>
                  <option value="26">26 - Dadra & Nagar Haveli</option>
                  <option value="27">27 - Maharashtra</option>
                  <option value="28">28 - Andhra Pradesh (Old)</option>
                  <option value="29">29 - Karnataka</option>
                  <option value="30">30 - Goa</option>
                  <option value="31">31 - Lakshadweep</option>
                  <option value="32">32 - Kerala</option>
                  <option value="33">33 - Tamil Nadu</option>
                  <option value="34">34 - Puducherry</option>
                  <option value="35">35 - Andaman & Nicobar Islands</option>
                  <option value="36">36 - Telangana</option>
                  <option value="37">37 - Andhra Pradesh (New)</option>
                </select>
              </div>
              <div class="mb-2 w-50">
                <label for="Addr1" class="form-label">
                  Buyer Address 1 **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr1"
                  aria-describedby="emailHelp"
                  name="Addr1"
                  value={formData.BuyerDtls.Addr1}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Addr2" class="form-label">
                  Buyer Address 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr2"
                  aria-describedby="emailHelp"
                  name="Addr2"
                  value={formData.BuyerDtls.Addr2}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Loc" class="form-label">
                  Buyer Place **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Loc"
                  aria-describedby="emailHelp"
                  name="Loc"
                  value={formData.BuyerDtls.Loc}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Stcd" class="form-label">
                  Buyer State Code **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Stcd"
                  aria-describedby="emailHelp"
                  name="Stcd"
                  value={formData.BuyerDtls.Stcd}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Pin" class="form-label">
                  Buyer Pincode **
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Pin"
                  aria-describedby="emailHelp"
                  name="Pin"
                  value={formData.BuyerDtls.Pin}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Ph" class="form-label">
                  Buyer Phone
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Ph"
                  aria-describedby="emailHelp"
                  name="Ph"
                  value={formData.BuyerDtls.Ph}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Em" class="form-label">
                  Buyer Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="Em"
                  aria-describedby="emailHelp"
                  name="Em"
                  value={formData.BuyerDtls.Em}
                  onChange={(e) => handleBuyerInput(e)}
                />
              </div>
            </div>
          </>
        );
      case 3: // DispDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Nm" class="form-label">
                  Dispatch From Name **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Nm"
                  aria-describedby="emailHelp"
                  name="Nm"
                  value={formData.DispDtls.Nm}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Addr1" class="form-label">
                  Dispatch from Address 1 **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr1"
                  aria-describedby="emailHelp"
                  name="Addr1"
                  value={formData.DispDtls.Addr1}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Addr2" class="form-label">
                  Dispatch from Address 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr2"
                  aria-describedby="emailHelp"
                  name="Addr2"
                  value={formData.DispDtls.Addr2}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Loc" class="form-label">
                  Dispatch from Place **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Loc"
                  aria-describedby="emailHelp"
                  name="Loc"
                  value={formData.DispDtls.Loc}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Stcd" class="form-label">
                  Dispatch from State Code **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Stcd"
                  aria-describedby="emailHelp"
                  name="Stcd"
                  value={formData.DispDtls.Stcd}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Pin" class="form-label">
                  Dispatch from Pincode **
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Pin"
                  aria-describedby="emailHelp"
                  name="Pin"
                  value={formData.DispDtls.Pin}
                  onChange={(e) => handleDispInput(e)}
                />
              </div>
            </div>
          </>
        );

      case 4: // ShipDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="LglNm" class="form-label">
                  Ship to Legal Name **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="LglNm"
                  aria-describedby="emailHelp"
                  name="LglNm"
                  value={formData.ShipDtls.LglNm}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TrdNm" class="form-label">
                  Ship to Trade Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TrdNm"
                  aria-describedby="emailHelp"
                  name="TrdNm"
                  value={formData.ShipDtls.TrdNm}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Gstin" class="form-label">
                  Ship to GSTIN **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Gstin"
                  aria-describedby="emailHelp"
                  name="Gstin"
                  value={formData.ShipDtls.Gstin}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Addr1" class="form-label">
                  Ship to Address 1 **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr1"
                  aria-describedby="emailHelp"
                  name="Addr1"
                  value={formData.ShipDtls.Addr1}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Addr2" class="form-label">
                  Ship to Address 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Addr2"
                  aria-describedby="emailHelp"
                  name="Addr2"
                  value={formData.ShipDtls.Addr2}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Loc" class="form-label">
                  Ship to Place **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Loc"
                  aria-describedby="emailHelp"
                  name="Loc"
                  value={formData.ShipDtls.Loc}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Stcd" class="form-label">
                  Ship to State Code **
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Stcd"
                  aria-describedby="emailHelp"
                  name="Stcd"
                  value={formData.ShipDtls.Stcd}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="Pin" class="form-label">
                  Ship to Pincode **
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Pin"
                  aria-describedby="emailHelp"
                  name="Pin"
                  value={formData.ShipDtls.Pin}
                  onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
          </>
        );
      case 5: // ItemDtls
        return (
          <>
            <div
              className="salesviewtable"
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div className="table-wrapper">
                {" "}
                <table className="table">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>Product</th>
                      <th>Service</th>
                      <th>HSN Code</th>
                      <th>Qty</th>
                      <th>Unit</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>GST Rate</th>
                      <th>Cess Rate (%)</th>
                      <th>Cess Exmp (Rs)</th>
                      <th>State Cess (%)</th>
                      <th>State C-Exmp (Rs)</th>
                      <th>Total Value</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>
                          <TextField
                            type="text"
                            value={row.PrdDesc}
                            name="PrdDesc"
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            name="IsServc"
                            type="text"
                            value={row.IsServc}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="HsnCd"
                            value={row.HsnCd}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>

                        <td>
                          <TextField
                            type="number"
                            name="Qty"
                            value={row.Qty}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="Unit"
                            value={row.Unit}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="UnitPrice"
                            value={row.UnitPrice}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            value={row.Discount}
                            onChange={(e) => handleItemChange(e, row.id)}
                            name="Discount"
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="GstRt"
                            value={row.GstRt}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="CesRt"
                            value={row.CesRt}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="CesNonAdvlAmt"
                            value={row.CesNonAdvlAmt}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="StateCesRt"
                            value={row.StateCesRt}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            name="StateCesNonAdvlAmt"
                            value={row.StateCesNonAdvlAmt}
                            onChange={(e) => handleItemChange(e, row.id)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="number"
                            value={row.TotItemVal}
                            onChange={(e) => handleItemChange(e, row.id)}
                            name="TotItemVal"
                          />
                        </td>
                        <td>
                          <IconButton onClick={() => deleteRow(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
              <Button
                style={{
                  height: "40px",
                  display: "flex",
                  left: "10rem",
                  width: "150px",
                  alignItems: "right",
                  justifyContent: "center",
                  border: "2px solid #565A5C",
                  fontSize: "15px",
                  color: " #565A5C",
                }}
                variant="outlined"
                startIcon={<AddCircleOutlineOutlinedIcon />}
                onClick={addItem}
              >
                Add
              </Button>
            </div>
          </>
        );

      case 6: // ValDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="AssVal" class="form-label">
                  Assessed Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="AssVal"
                  aria-describedby="emailHelp"
                  name="AssVal"
                  value={formData.ValDtls.AssVal}
                  disabled
                  // onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="CgstVal" class="form-label">
                  Cgst Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="CgstVal"
                  aria-describedby="emailHelp"
                  name="CgstVal"
                  value={formData.ValDtls.CgstVal}
                  disabled
                  // onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="SgstVal" class="form-label">
                  Sgst Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="SgstVal"
                  aria-describedby="emailHelp"
                  name="SgstVal"
                  value={formData.ValDtls.SgstVal}
                  disabled
                  //onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="IgstVal" class="form-label">
                  Igst Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="IgstVal"
                  aria-describedby="emailHelp"
                  name="IgstVal"
                  value={formData.ValDtls.IgstVal}
                  disabled
                  //onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="CesVal" class="form-label">
                  Cess Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="CesVal"
                  aria-describedby="emailHelp"
                  name="CesVal"
                  value={formData.ValDtls.CesVal}
                  disabled
                  // onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="StCesVal" class="form-label">
                  State Cess Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="StCesVal"
                  aria-describedby="emailHelp"
                  name="StCesVal"
                  value={formData.ValDtls.StCesVal}
                  disabled
                  //onChange={(e) => handleShipInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Discount" class="form-label">
                  Discount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Discount"
                  aria-describedby="emailHelp"
                  name="Discount"
                  value={formData.ValDtls.Discount}
                  disabled
                  //onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="RndOffAmt" class="form-label">
                  Round Off Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="RndOffAmt"
                  aria-describedby="emailHelp"
                  name="RndOffAmt"
                  value={formData.ValDtls.RndOffAmt}
                  onChange={(e) => handleValInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="TotInvVal" class="form-label">
                  Total Invoice Value
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="TotInvVal"
                  aria-describedby="emailHelp"
                  name="TotInvVal"
                  value={formData.ValDtls.TotInvVal}
                  disabled
                  //onChange={(e) => handleShipInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TotInvValFc" class="form-label">
                  Total Invoice Value in Foreign Currency
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="TotInvValFc"
                  aria-describedby="emailHelp"
                  name="TotInvValFc"
                  value={formData.ValDtls.TotInvValFc}
                  disabled
                  //onChange={(e) => handleValInput(e)}
                />
              </div>
            </div>
          </>
        );

      case 7: // PayDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Nm" class="form-label">
                  Payee Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Nm"
                  aria-describedby="emailHelp"
                  name="Nm"
                  value={formData.PayDtls.Nm}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="AccDet" class="form-label">
                  Payee Bank Account Number
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="AccDet"
                  aria-describedby="emailHelp"
                  name="AccDet"
                  value={formData.PayDtls.AccDet}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Mode" class="form-label">
                  Mode of Payment
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Mode"
                  aria-describedby="emailHelp"
                  name="Mode"
                  value={formData.PayDtls.Mode}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="FinInsBr" class="form-label">
                  Bank Branch Code
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="FinInsBr"
                  aria-describedby="emailHelp"
                  name="FinInsBr"
                  value={formData.PayDtls.FinInsBr}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="PayTerm" class="form-label">
                  Payment Terms
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="PayTerm"
                  aria-describedby="emailHelp"
                  name="PayTerm"
                  value={formData.PayDtls.PayTerm}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="PayInstr" class="form-label">
                  Payment Instructions
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="PayInstr"
                  aria-describedby="emailHelp"
                  name="PayInstr"
                  value={formData.PayDtls.PayInstr}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="CrTrn" class="form-label">
                  Credit Transfer Terms
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="CrTrn"
                  aria-describedby="emailHelp"
                  name="CrTrn"
                  value={formData.PayDtls.CrTrn}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="DirDr" class="form-label">
                  Direct Debit Terms
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="DirDr"
                  aria-describedby="emailHelp"
                  name="DirDr"
                  value={formData.PayDtls.DirDr}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="CrDay" class="form-label">
                  Credit Days
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="CrDay"
                  aria-describedby="emailHelp"
                  name="CrDay"
                  value={formData.PayDtls.CrDay}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="PaidAmt" class="form-label">
                  Paid Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="PaidAmt"
                  aria-describedby="emailHelp"
                  name="PaidAmt"
                  value={formData.PayDtls.PaidAmt}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="PaymtDue" class="form-label">
                  Payment Due
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="PaymtDue"
                  aria-describedby="emailHelp"
                  name="PaymtDue"
                  value={formData.PayDtls.PaymtDue}
                  onChange={(e) => handlePayInput(e)}
                />
              </div>
            </div>
          </>
        );

      case 8: // EwbDtls
        return (
          <>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="TransId" class="form-label">
                  Transporter Id
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TransId"
                  aria-describedby="emailHelp"
                  name="TransId"
                  value={formData.EwbDtls.TransId}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TransName" class="form-label">
                  Transporter Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TransName"
                  aria-describedby="emailHelp"
                  name="TransName"
                  value={formData.EwbDtls.TransName}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="Distance" class="form-label">
                  Distance of Transportation
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="Distance"
                  aria-describedby="emailHelp"
                  name="Distance"
                  value={formData.EwbDtls.Distance}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
              <div className="mb-2 w-50">
                <label htmlFor="TransMode" className="form-label">
                  Mode of Transportation **
                </label>
                <select
                  className="form-select"
                  id="TransMode"
                  name="TransMode"
                  value={formData.EwbDtls.TransMode}
                  onChange={(e) => handleEwabInput(e)}
                >
                  <option value="">Select State</option>
                  <option value="road">Road</option>
                  <option value="air">Air</option>
                  <option value="rail">Rail</option>
                  <option value="ship">Ship</option>
                </select>
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="TransDocNo" class="form-label">
                  Transport Document Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="TransDocNo"
                  aria-describedby="emailHelp"
                  name="TransDocNo"
                  value={formData.EwbDtls.TransDocNo}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="TransDocDt" class="form-label">
                  Transport Document Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="TransDocDt"
                  aria-describedby="emailHelp"
                  name="TransDocDt"
                  value={formData.EwbDtls.TransDocDt}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
            </div>
            <div className="data-input-fields">
              <div class="mb-2 w-50">
                <label for="VehNo" class="form-label">
                  Vehicle No
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="VehNo"
                  aria-describedby="emailHelp"
                  name="VehNo"
                  value={formData.EwbDtls.VehNo}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
              <div class="mb-2 w-50">
                <label for="VehType" class="form-label">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="VehType"
                  aria-describedby="emailHelp"
                  name="VehType"
                  value={formData.EwbDtls.VehType}
                  onChange={(e) => handleEwabInput(e)}
                />
              </div>
            </div>
          </>
        );

      default:
        return "unknown step";
    }
  }

  return (
    <div style={{ background: "#F8F6F2", padding: "0" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          {
            <form className="form-input-fields">
              {getStepContent(activeStep)}
            </form>
          }
          <Button
            style={{ marginBottom: "20px", marginLeft: "20px" }}
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            back
          </Button>

          <Button
            style={{ marginBottom: "20px", marginLeft: "10px" }}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
};

export default InvForm;
