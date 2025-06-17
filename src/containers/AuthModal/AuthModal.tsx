import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { createUserProfileIfNotExist } from "../../firebase/auth";
import { auth } from "../../firebase/firebaseApp";
import Button from "../../components/Button/Button";
import "./AuthModal.css";

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone.match(/^\+?\d{10,15}$/)) {
      alert("❌ Please enter a valid phone number with country code.");
      return false;
    }
    if (mode === "signup") {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();
      if (!trimmedUsername) {
        alert("❌ Username is required.");
        return false;
      }
      if (
        !trimmedEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        alert("❌ Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const sendOTP = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "auth-modal__recaptcha",
          {
            size: "invisible",
            callback: (response: any) => {
              console.log("reCAPTCHA solved ✅", response);
            },
          }
        );
        await window.recaptchaVerifier.render();
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone.trim(),
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setStep("otp");
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      alert("❌ Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(otp.trim());
      const user = result.user;

      if (mode === "signup") {
        await createUserProfileIfNotExist(
          user.uid,
          username.trim(),
          email.trim(),
          phone.trim()
        );
      }

      alert("✅ Successfully logged in!");
      onClose();
    } catch (err) {
      console.error("❌ Invalid OTP", err);
      alert("❌ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose}></div>
      <div className="auth-modal__content">
        <button className="auth-modal__close" onClick={onClose}>
          ×
        </button>

        {step === "form" ? (
          <>
            <h2 className="auth-modal__title">
              {mode === "signup" ? "Sign Up" : "Login"}
            </h2>
            {mode === "signup" && (
              <>
                <input
                  className="auth-modal__input"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <input
                  className="auth-modal__input"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </>
            )}
            <input
              className="auth-modal__input"
              placeholder="Phone (e.g. +201234567890)"
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <div id="auth-modal__recaptcha"></div>
            <Button variant="success" onClick={sendOTP} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
            <span className="flex flex-row items-center gap-2">
              <span>
                {mode === "signup" ? "Already registered? " : "New user? "}
              </span>
              <Button
                variant="text"
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              >
                {mode === "signup" ? "Login in" : "Sign up"}
              </Button>
            </span>
          </>
        ) : (
          <>
            <h2 className="auth-modal__title">Enter OTP</h2>
            <input
              className="auth-modal__input"
              placeholder="OTP Code"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <Button variant="success" onClick={verifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
