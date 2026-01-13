"use client";

import React, { useEffect, useState } from "react";
import { GradientBackgrounds } from "./gradient-bacground";
import { AuthInputField } from "@/ui/auth-input/Auth-input";
import { Button } from "@/ui/Button/Button";
import Image from "next/image";
import * as styles from "./styles/login.styles";
import { BackButton } from "@/ui/back-button/back-button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, type RootState } from "@/redux/store";
import { loginUserThunk } from "@/redux/features/AuthSlice";

export const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadPoster = async () => {
      try {
      } catch {
        setPosterUrl(null);
      }
    };
    loadPoster();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!formData.identifier || !formData.password) {
      setErrors({
        ...(formData.identifier ? {} : { identifier: "Required" }),
        ...(formData.password ? {} : { password: "Required" }),
      });
      return;
    }

    const result = await dispatch(loginUserThunk(formData));

    if (loginUserThunk.fulfilled.match(result)) {
      const user = result.payload.user;
      const role = user?.role;

      const redirectPath = sessionStorage.getItem("redirectAfterLogin");
      sessionStorage.removeItem("redirectAfterLogin");

      if (redirectPath) {
        window.location.href = redirectPath;
      } else if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gradientBackground}>
        <GradientBackgrounds />
      </div>

      <BackButton />

      <div className={styles.mainContent}>
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <h1 className={styles.heading}>Login</h1>
            <p className={styles.subHeading}>Enter your details to login</p>

            <div className={styles.formFields}>
              <AuthInputField
                label="Phone number/Email"
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                error={errors.identifier}
              />
              <AuthInputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </div>

            <div className={styles.loginButtonWrapper}>
              <Button variant="gradient" className={styles.loginButton} onClick={handleSubmit} disabled={status === "loading"}>
                {status === "loading" ? "Logging in..." : "Login"}
              </Button>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className={styles.signupWrapper}>
              <span className={styles.signupText}>Don&apos;t have an account? </span>
              <button className={styles.signupButton} onClick={() => router.push("/signup")}>
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className={styles.rightImageWrapper}>
          <Image
            src={posterUrl || "/images/alpha-festival-poster.jpg"}
            alt="Auth Hero"
            width={800}
            height={600}
            className={styles.rightImage}
            priority
          />
        </div>
      </div>
    </div>
  );
};
