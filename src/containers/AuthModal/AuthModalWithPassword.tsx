import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebaseApp";
import { setUser } from "../../store/authSlice";
import { useCreateUserProfileMutation } from "../../apis/firebaseApi";
import {
  loginSchema,
  signupSchema,
} from "../../utils/generateValidationSchema";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./AuthModal.css";

type AuthFormData = {
  username?: string;
  email: string;
  password: string;
};

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<"signup" | "login" | "forgot">("signup");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [createUserProfile] = useCreateUserProfileMutation();

  const schema = mode === "signup" ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);

      let userCredential;

      if (mode === "signup") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await sendEmailVerification(userCredential.user);
        toast.success("📨 Verification email sent! Please verify to proceed.");

        await createUserProfile({
          uid: userCredential.user.uid,
          email: data.email,
          username: data.username ?? "",
        });

        setMode("login");
        setLoading(false);
        return; // ❌ Exit early, don't log in
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        if (!userCredential.user.emailVerified) {
          toast.error("❌ Please verify your email before logging in.");
          setLoading(false);
          return;
        }
      }

      // ✅ Only run below if verified login
      const payload = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        username: data.username ?? "", // Optional, probably empty for login
        isAuthenticated: true,
      };

      dispatch(setUser(payload));
      toast.success(`Successfully logged in!`);
      onClose();
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger one.");
      } else {
        toast.error("Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (data: AuthFormData) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      toast.success("📨 Password reset email sent. Check your inbox.");
      setMode("login");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        toast.error("❌ No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("❌ Invalid email format.");
      } else {
        toast.error("Failed to send reset email.");
      }
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

        <h2 className="auth-modal__title">
          {
            {
              signup: "Sign Up",
              login: "Login",
              forgot: "Reset Password",
            }[mode]
          }
        </h2>

        {mode === "signup" && (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-modal__form">
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
            <Input
              type="password"
              placeholder="Enter your password"
              error={errors.password}
              {...register("password")}
            />

            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <span className="flex flex-row items-center gap-2 mt-4">
              <span>Already registered?</span>
              <Button variant="text-lg" onClick={() => setMode("login")}>
                Login
              </Button>
            </span>
          </form>
        )}

        {mode === "login" && (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-modal__form">
            <Input
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              {...register("email")}
            />
            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                error={errors.password}
                {...register("password")}
              />
              <Button
                variant="text-lg"
                className="text-sm p-0"
                onClick={() => setMode("forgot")}
              >
                Forgot Password?
              </Button>
            </div>

            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <span className="flex flex-row items-center gap-2 mt-4">
              <span >New user?</span>
              <Button variant="text-lg" onClick={() => setMode("signup")}>
                Sign Up
              </Button>
            </span>
          </form>
        )}

        {mode === "forgot" && (
          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="auth-modal__form"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              {...register("email")}
            />

            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <span className="flex flex-row items-center gap-2 mt-4">
              <span>Remember your password?</span>
              <Button variant="text-lg" onClick={() => setMode("login")}>
                Back to Login
              </Button>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};
