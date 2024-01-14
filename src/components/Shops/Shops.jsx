import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Skeleton } from "@mui/material";
import AddEditModal from "../AddEditModal/AddEditModal";
import ShopCard from "../ShopCard/ShopCard";

const Shops = ({ shops }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editShopData, setEditShopData] = useState(null);

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
      <Grid container spacing={2}>
        <Button fullWidth style={{ height: "3rem" }} onClick={addShop}>
          Add Shop
        </Button>
        {shops && shops.length > 0 ? (
          // Render shop cards when data is loaded
          shops.map((shop) => (
            <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
              <ShopCard shop={shop} onEdit={editShop}></ShopCard>
            </Grid>
          ))
        ) : (
          <Skeleton
            variant="rounded"
            animation="wave"
            height={300}
            width="100%"
          />
        )}
      </Grid>
    </Box>
  );
};
export default Shops;
