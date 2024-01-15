import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import LocationSearchInput from "./LocationSearchInput";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddEditModal = ({ setOpenModal, openModal, editShopData }) => {
  const firestore = getFirestore();
  const [locationAddress, setLocationAddress] = useState("");
  const [latLng, setLatLng] = useState({});
  // const [isValid, setIsValid] = useState(false);
  const [shopData, setShopData] = useState({
    name: "",
    code: "",
    phoneNumber: "",
    location: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editShopData) {
      // If editShopData is provided, set the shopData state for editing
      setShopData(editShopData);
      setIsEditMode(true);
    } else {
      // If no editShopData, reset the shopData state for adding
      setShopData({
        name: "",
        code: "",
        phoneNumber: "",
        location: "",
      });
      setIsEditMode(false);
    }
  }, [editShopData]);

  const resetForm = () => {
    setShopData({
      name: "",
      code: "",
      phoneNumber: "",
      location: "",
      latitude: "",
      longitude: "",
    });
    setIsEditMode(false);
    // setIsValid(false);
  };
  // const validateForm = () => {
  //   // Implement your validation logic here
  //   // For simplicity, let's consider the form valid if all required fields are filled
  //   const isValidForm =
  //     shopData.name.trim() !== "" &&
  //     shopData.code.trim() !== "" &&
  //     shopData.phoneNumber.trim() !== "";
  // setIsValid(isValidForm);
  //   return isValidForm;
  // };
  const addShop = async (shopData) => {
    shopData = {
      ...shopData,
      longitude: latLng.lng,
      latitude: latLng.lat,
      location: locationAddress,
    };
    const shopsRef = collection(firestore, "shops");
    await addDoc(shopsRef, shopData);
  };
  const updateShop = async (shopData) => {
    shopData = {
      ...shopData,
      longitude: latLng.lng,
      latitude: latLng.lat,
      location: locationAddress,
    };
    const shopDocRef = doc(firestore, "shops", editShopData.id);
    await setDoc(shopDocRef, shopData);
  };
  const handleChange = (event) => {
    setShopData({
      ...shopData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  // const isFormValid = validateForm();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditMode) {
      updateShop(shopData);
      handleClose();
    } else {
      addShop(shopData);
      resetForm();
      handleClose();
    }
  };

  return (
    <Box>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? "Edit Shop" : "Add Shop"}
        </DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", right: 20, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <LocationSearchInput
              setLocationAddress={setLocationAddress}
              setLatLng={setLatLng}
            />
            <TextField
              required
              margin="dense"
              label="Name"
              name="name"
              value={shopData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              label="Code"
              name="code"
              value={shopData.code}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              label="Phone Number"
              name="phoneNumber"
              value={shopData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "16px" }}
              fullWidth
              disabled={!isFormValid}
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </form>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default AddEditModal;
