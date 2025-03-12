import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

interface FormData {
  name: string;
  address: string;
  phone: string;
}

export default function FormComponent() {
  const [formData, setFormData] = useState<FormData>({ name: "", address: "", phone: "" });
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    const handleBackButton = () => {
      if (!isSaved) {
        const confirmLeave = window.confirm("You have unsaved changes. Do you want to save before leaving?");
        if (!confirmLeave) {
          navigate(1); // Stay on the same page
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isSaved, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    alert("Data saved successfully!");
  };

  const handleBack = () => {
    if (!isSaved) {
      const confirmLeave = window.confirm("You have unsaved changes. Do you want to save before leaving?");
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" gutterBottom>
          User Form
        </Typography>
        <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>
          <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
          <Button variant="contained" color="primary">Next</Button>
        </Box>
      </Box>
    </Container>
  );
}
