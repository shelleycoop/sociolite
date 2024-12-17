import styles from "./Main.module.scss";
import { useState } from "react";

const Main = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset the message
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear the input
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <main className="section-title">
      <h1 style={{ marginLeft: "60px" }}>LAUNCHING SOON!</h1>
      <h1 style={{ marginLeft: "60px" }}>STAY TUNED</h1>
      <p className="green" style={{ marginLeft: "65px" }}>
        Drop your email for immediate updates:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: "540px",
            height: "54px",
            marginLeft: "70px",
            marginBottom: "20px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            height: "54px",
            padding: "0 20px",
            backgroundColor: "#538098",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ marginLeft: "65px" }}>{message}</p>}
    </main>
  );
};

export default Main;
