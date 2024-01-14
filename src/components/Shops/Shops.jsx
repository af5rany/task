import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import Map from "../Map/Map";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import AddEditModal from "../AddEditModal/AddEditModal";
import ShopCard from "../ShopCard";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editShopData, setEditShopData] = useState(null);

  useEffect(() => {
    const shopsRef = collection(firestore, "shops");
    const unsubscribe = onSnapshot(shopsRef, (snapshot) => {
      const updatedShops = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShops(updatedShops);
    });
    return () => unsubscribe();
  }, []);

  const editShop = (editedShop) => {
    setEditShopData(editedShop);
    setOpenModal(true);
  };

  const addShop = () => {
    setEditShopData();
    setOpenModal(true);
  };
  return (
    <Box>
      <AddEditModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        editShopData={editShopData}
      />
      <Box mb={"1rem"} width={"100%"}>
        <Map shops={shops} />
      </Box>
      <Grid container spacing={2}>
        <Button
          // variant="contained"
          style={{ height: "3rem", width: "100%" }}
          onClick={addShop}
        >
          Add Shop
        </Button>
        {shops.map((shop) => (
          <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
            <ShopCard shop={shop} onEdit={editShop}></ShopCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Shops;
