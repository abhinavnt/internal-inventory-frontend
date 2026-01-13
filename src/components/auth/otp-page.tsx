"use client";

import React, { useEffect, useState } from "react";
import { BackButton } from "@/ui/back-button/back-button";
import { GradientBackgrounds } from "./gradient-bacground";
import { OtpInput } from "@/ui/otp-input/OtpInput";
import { Button } from "@/ui/Button/Button";
import Image from "next/image";
import * as styles from "./styles/otp.styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { resendOtpUserThunk, verifyOtpUserThunk } from "@/redux/features/AuthSlice";
import { getHeroPoster } from "@/services/heroService";

export const OtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const identifier = searchParams.get("identifier") || "";

  const [otpValue, setOtpValue] = useState("");
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) router.back();
  }, [identifier, router]);

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

  const handleSubmit = async () => {
    if (otpValue.length === 4) {
      const result = await dispatch(verifyOtpUserThunk({ identifier, otp: otpValue }));

      if (verifyOtpUserThunk.fulfilled.match(result)) {
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath || "/");
      }
    }
  };

  const handleResend = async () => {
    await dispatch(resendOtpUserThunk({ identifier }));
    setOtpValue("");
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
            <h1 className={styles.heading}>Verify OTP</h1>
            <p className={styles.subHeading}>Enter the OTP sent to {identifier}</p>

            <div className={styles.otpWrapper}>
              <OtpInput length={4} onComplete={setOtpValue} onOtpChange={setOtpValue} />
            </div>

            <div className={styles.submitButtonWrapper}>
              <Button
                variant="gradient"
                onClick={handleSubmit}
                disabled={otpValue.length !== 4 || status === "loading"}
                className={styles.submitButton}
              >
                {status === "loading" ? "Verifying..." : "Submit"}
              </Button>
            </div>

            <div className="mt-4 text-center">
              <button onClick={handleResend} disabled={status === "loading"} className="text-[#0cc2ef] text-sm underline">
                Resend OTP
              </button>
            </div>

            {error && <p className="mt-2 text-red-400 text-sm text-center">{error}</p>}
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
