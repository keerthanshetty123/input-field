import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";

const NumberForm: React.FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      const confirmExit = window.confirm("Please Save the Changes");
      if (!confirmExit) {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.history.pushState(null, "", window.location.href); 
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
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
    alert("Save the Changes");
  };

  const handleSave = () => {
    alert(`Value Saved: ${value}`);
  };

  const handleNext = () => {
    alert("Next button clicked");
  };

  return (
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
  );
};

export default NumberForm;
