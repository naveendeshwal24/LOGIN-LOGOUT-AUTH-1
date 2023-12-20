import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import "../Styles/Loader.css";
const Loader = ({ progress }) => {
  return (
    <div className="loader-container">
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "fixed", //change the position of inner text
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Loader;
