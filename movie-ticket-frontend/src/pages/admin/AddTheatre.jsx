import { useState } from "react";
import API from "../../api/axios";

function AddTheatre() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    totalSeats: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.address.trim() ||
      !formData.totalSeats
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(formData.totalSeats) <= 0) {
      alert("Total seats must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/theatres", {
        name: formData.name.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        totalSeats: Number(formData.totalSeats),
      });

      if (res.data.success) {
        alert("Theatre added successfully!");

        setFormData({
          name: "",
          city: "",
          address: "",
          totalSeats: "",
        });
      }
    } catch (error) {
      console.error("Add Theatre Error:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to add theatre"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>🏢 Add Theatre</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Theatre Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          min="1"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading
              ? "#999"
              : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Adding..." : "Add Theatre"}
        </button>
      </form>
    </div>
  );
}

export default AddTheatre;