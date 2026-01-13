"use client";

import React, { useEffect, useState } from "react";
import { GradientBackgrounds } from "./gradient-bacground";
import { AuthInputField } from "@/ui/auth-input/Auth-input";
import { Button } from "@/ui/Button/Button";
import Image from "next/image";
import * as styles from "./styles/signup.styles";
import { BackButton } from "@/ui/back-button/back-button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { registerUserThunk } from "@/redux/features/AuthSlice";
import { getHeroPoster } from "@/services/heroService";

type FormDataType = {
  identifier: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = Partial<FormDataType>;

export const SignupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});

  useEffect(() => {
    const loadPoster = async () => {
      try {
        const res = await getHeroPoster();
        setPosterUrl(res.posterImageUrl);
      } catch {
        setPosterUrl(null);
      }
    };
    loadPoster();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormDataType]: value }));
    if (errors[name as keyof ErrorType]) {
      setErrors((prev) => ({ ...prev, [name as keyof ErrorType]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.identifier || !formData.password || !formData.confirmPassword) {
      setErrors({
        identifier: !formData.identifier ? "Required" : undefined,
        password: !formData.password ? "Required" : undefined,
        confirmPassword: !formData.confirmPassword ? "Required" : undefined,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    const result = await dispatch(
      registerUserThunk({
        identifier: formData.identifier,
        password: formData.password,
      })
    );

    if (registerUserThunk.fulfilled.match(result)) {
      router.push(`/otp?identifier=${encodeURIComponent(formData.identifier)}`);
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
            <h1 className={styles.heading}>Create an Account</h1>
            <p className={styles.subHeading}>You can join by selecting one of the following options</p>

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
              <AuthInputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
              />
            </div>

            <div className={styles.signupButtonWrapper}>
              <Button variant="gradient" className={styles.signupButton} onClick={handleSubmit} disabled={status === "loading"}>
                {status === "loading" ? "Signing up..." : "Sign up"}
              </Button>
            </div>

            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

            <div className={styles.loginWrapper}>
              <span className={styles.loginText}>Already have an account? </span>
              <button className={styles.loginButton} onClick={() => router.push("/login")}>
                Login
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
