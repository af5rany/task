import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles({
  root: {
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
});

function ShopCard({ shop, onEdit }) {
  const [openDelete, setOpenDelete] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
  };
  const handleDeleteShop = (shopId) => {
    const shopRef = doc(firestore, "shops", shopId);
    deleteDoc(shopRef);
    // handleClose();
  };

  return (
    <Box>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>{"Are you sure you want to delete this shop"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => handleDeleteShop(shop.id)}
            variant="text"
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <Box
            sx={{ p: 2, display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h6" component="div">
              ShopName: {shop.name}
            </Typography>
            <Typography color="textSecondary">
              Shop Code: {shop.code}
            </Typography>
            <Typography color="textSecondary">
              Phone Number: {shop.phoneNumber}
            </Typography>
            <Typography color="textSecondary">
              {/* Phone Number: {shop.lang} */}
            </Typography>
          </Box>
        </CardContent>
        <Box
          display={"flex"}
          justifyContent={"end"}
          gap={"0.5rem"}
          alignItems={"center"}
          mr={"0.5rem"}
        >
          <Button onClick={() => onEdit(shop)} variant="text">
            Edit Shop
          </Button>
          <DeleteIcon
            className={classes.root}
            onClick={handleClickOpen}
            color="error"
          />
        </Box>
      </Card>
    </Box>
  );
}

export default ShopCard;
