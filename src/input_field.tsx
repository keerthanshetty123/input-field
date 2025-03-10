import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const NumberForm: React.FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const handlePopState = () => {
      setOpen(true);
      window.history.pushState(null, "", window.location.pathname); 
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*(\.\d{0,2})?$/.test(newValue) || newValue === "") {
      setValue(newValue);
      setError("");
    } else {
      setError("Enter a valid number with up to 2 decimal places");
    }
  };

  const handleBack = () => {
    handleOpen();
  };

  const handleSave = () => {
    alert(`Value Saved: ${value}`);
    if(open)
    {
    handleClose();
    }
  };

  const handleNext = () => {
    alert("Next button clicked");
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={2} mt={5}>
          <TextField
            label="Enter Number"
            variant="outlined"
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            fullWidth
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} display="flex" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Save the Changes
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSave} >
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
             Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default NumberForm;
