import styles from "./Main.module.scss";
import { useState } from "react";
import axios from 'axios';

const Main = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function includesAnyOf(s, chars) {
    let op = false;
    for (let i = 0; i < chars.length; i++) {
        if (s.includes(chars[i])) op = true;
    }
    return op;
}

  function isValidEmail (email) {
    if (!email)
        return false;
    function excludeQuotedPart(s) {
        let op = '',
            startQuote = false,
            char = '',
            quoteEnded = false,
            quoteStartIndex = 0;
        for (let i = 0; i < s.length; i++) {
            if (startQuote) {
                if (s[i] === '\\' && s[i + 1] === '"') {
                    op += 'xx';
                    i++;
                    continue;
                }
                if (s.at(i) === char) {
                    quoteEnded = true;
                    startQuote = false;
                } else {
                    op += 'x';
                }
                if (s[i] === '\\') {
                    if (s[i + 1] !== '\\') {
                        return false;
                    } else {
                        i++;
                    }
                }
            } else if (s.at(i) === "'" || s.at(i) === '"') {
                startQuote = true;
                quoteStartIndex = i;
                quoteEnded = false;
                char = s.at(i);
            } else {
                op += s.at(i);
            }
        }
        if (!quoteEnded) {
            op = op.slice(0, quoteStartIndex) + s.slice(quoteStartIndex);
        }
        return op;
    }
    if (excludeQuotedPart(email) === false) {
        return false;
    }

    if (email.startsWith('.') || email.endsWith('.') || email.includes('@@')) {
        return false;
    }

    const parts = excludeQuotedPart(email).split('@');
    if (parts.length !== 2) {
        return false;
    }

    const localPart = parts[0];
    const domainPart = parts[1];

    if (localPart === '') {
        return false;
    }

    if ([".", "/", "?", "'", "{", "}", "|", "_", "-", "=", "+", "*", "&", "^", "%", "$", "#", "!", "~", "`"]?.includes(localPart?.charAt(localPart?.length - 1))) {
        return false
    }

    if (!(/^[a-zA-Z0-9]/.test(localPart))) {
        return false;
    }
    if (localPart.length > 64) {
        return false;
    }

    if (excludeQuotedPart(localPart)?.includes('..')) {
        return false;
    }

    if (localPart.startsWith('@') || localPart.startsWith('-')) {
        return false;
    }
    // if (/^[0-9]/.test(localPart)) {
    //     return false;
    // }
    if (includesAnyOf(excludeQuotedPart(localPart), ' ()[]<>,:;"\\')) {
        return false;
    }

    if (domainPart.length > 255) {
        return false;
    }
    if (
        domainPart?.includes('..') ||
        domainPart.startsWith('.') ||
        domainPart.endsWith('.')
    ) {
        return false;
    }
    if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
        return false;
    }
    if (/^.*?[0-9]$/.test(domainPart)) {
        return false;
    }
    const domainParts = domainPart.split('.');
    if (domainParts.length < 2 || domainParts.some((part) => part === '' || part.length < 2 || !(/^[0-9a-zA-Z\-.]*$/.test(part)))) {
        return false;
    }
    if (/\d/.test(domainParts[1])) {
        return false;
    }
    if (/\d/.test(domainParts[domainParts.length-1])) {
        return false;
    }
    return true;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous messages
    setMessage("");
    setError("");
  
    // Validate email format
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      // Send email to the backend
      const response = await axios.post("http://localhost:5000/api/subscribe", { email });
      setMessage(response.data.message); // Show success message
      setEmail(""); // Clear input
    } catch (error) {
      // Handle backend responses
      if (error.response?.data?.error === "Email already exists") {
        setError("This email is already subscribed.");
      } else {
        setError("Failed to send notification. Please try again later.");
      }
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
        <div className={styles.formContainer}>
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
            marginLeft: "70px",
            // height: "54px",
            // padding: "0 20px",
            backgroundColor: "#538098",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        </div>
      </form>
      {error && <p style={{ marginLeft: "65px", color: "red" }}>{error}</p>}
      {message && <p style={{ marginLeft: "65px" }}>{message}</p>}
    </main>
  );
};

export default Main;
