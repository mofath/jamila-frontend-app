import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from "react-hot-toast";
import { useCreateUserProfileMutation } from "../../apis/firebaseApi";
import { loginSchema, signupSchema, otpSchema } from "../../utils/generateValidationSchema";
import { auth } from "../../firebase/firebaseApp";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./AuthModal.css";

type AuthFormData = {
  username?: string;
  email?: string;
  phone?: string;
  otp?: string;
};

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [loading, setLoading] = useState(false);
  const [createUserProfile] = useCreateUserProfileMutation();

  const schema =
    step === "otp" ? otpSchema : mode === "signup" ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema as any),
  });

  const phone = watch("phone");
  const username = watch("username");
  const email = watch("email");
  const otp = watch("otp");

  const sendOTP = async () => {
    try {
      setLoading(true);
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "auth-modal__recaptcha",
          {
            size: "invisible",
            callback: () => console.log("reCAPTCHA solved ✅"),
          }
        );
        await window.recaptchaVerifier.render();
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone!.trim(),
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      toast.success("✅ OTP sent successfully.");
      setStep("otp");
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      toast.error("❌ Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      if (!otp) throw new Error("OTP is missing");

      const result = await window.confirmationResult.confirm(otp.trim());
      const user = result.user;

      if (mode === "signup") {
        await createUserProfile({
          uid: user.uid,
          username: username?.trim() || "",
          email: email?.trim() || "",
          phone: phone?.trim() || "",
        });
      }

      toast.success("✅ Successfully logged in!");
      onClose();
    } catch (err) {
      console.error("❌ Invalid OTP", err);
      toast.error("❌ Invalid OTP. Please try again.");
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
            <form
              onSubmit={handleSubmit(sendOTP)}
              className="auth-modal__form"
            >
              {mode === "signup" && (
                <>
                  <Input
                    placeholder="Enter your username"
                    error={errors.username}
                    {...register("username")}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email}
                    {...register("email")}
                  />
                </>
              )}
              <Input
                type="tel"
                placeholder="Phone (e.g. +201234567890)"
                error={errors.phone}
                {...register("phone")}
              />

              <div id="auth-modal__recaptcha"  className="auth-modal__recaptcha"/>
              
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>

            <span className="flex flex-row items-center gap-2">
              <span>
                {mode === "signup" ? "Already registered?" : "New user?"}
              </span>
              <Button
                variant="text"
                onClick={() =>
                  setMode((prev) => (prev === "signup" ? "login" : "signup"))
                }
              >
                {mode === "signup" ? "Login" : "Sign up"}
              </Button>
            </span>
          </>
        ) : (
          <>
            <h2 className="auth-modal__title">Enter OTP</h2>
            <form
              onSubmit={handleSubmit(verifyOTP)}
              className="auth-modal__form"
            >
              <Input
                label="OTP Code"
                placeholder="Enter the code"
                error={errors.otp}
                {...register("otp")}
              />
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
