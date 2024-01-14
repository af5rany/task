import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Map from "../components/Map/Map";
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Shops from "../components/Shops/Shops";

function Home() {
  const [shops, setShops] = useState([]);

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

  return (
    <>
      <Box mb={"1rem"} width={"100%"}>
        <Map shops={shops} />
      </Box>
      <Shops shops={shops} />
    </>
  );
}

export default Home;
