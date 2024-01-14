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
import LocationSearchInput from "../LocationSearchInput";

const AddEditModal = ({ setOpenModal, openModal, editShopData }) => {
  const firestore = getFirestore();
  const [locationAddress, setLocationAddress] = useState("");
  const [latLng, setLatLng] = useState({});
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
  };
  // useEffect(() => {
  // console.log("shopData", shopData);
  // });
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
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddEditModal;
