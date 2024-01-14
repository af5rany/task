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
import Autocomplete from "@mui/lab/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchInput from "../LocationSearchInput";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const AddEditModal = ({ setOpenModal, openModal, editShopData }) => {
  const firestore = getFirestore();
  // const [value, setValue] = useState(null);
  const [location, setLocation] = useState("");
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
        latitude: "", // Assuming you have latitude and longitude fields
        longitude: "",
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
    setLocation(null);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
    setShopData({
      ...shopData,
      location: location.address, // Set the location address
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const handleChange = (event) => {
    setShopData({
      ...shopData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setOpenModal(false);
    resetForm();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditMode) {
      updateShop(shopData);
    } else {
      addShop(shopData);
    }
    handleClose();
  };

  const addShop = async (shopData) => {
    const shopsRef = collection(firestore, "shops");
    await addDoc(shopsRef, shopData);
  };
  const updateShop = async (shopData) => {
    const shopDocRef = doc(firestore, "shops", editShopData.id); // Assuming you have an "id" field in your shopData
    await setDoc(shopDocRef, shopData);
  };
  const handlePlaceChanged = () => {};
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
            {/* <LocationSearchInput onLocationSelect={handleLocationChange} /> */}
            {/* <LoadScript googleMapsApiKey="AIzaSyAAkhpiyn0ADrOC0jqxY0nZVDF-6Sdi8X0">
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <input type="text" className="form-controll"></input>
              </StandaloneSearchBox>
            </LoadScript> */}
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
