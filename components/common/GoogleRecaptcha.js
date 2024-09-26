"use client";

import ReCAPTCHA from "react-google-recaptcha";

export let isVerified = true;
export let isTest =
  typeof window !== "undefined" ? Boolean(window.Cypress) : false;

export const GoogleRecaptcha = () => {
  const testKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const enterpriseKey = "6LcW640pAAAAAHmhtXaJKNIF3hcLUayB0Ten4Ess";

  const onLoad = () => {
    isVerified = true;
  };

  const onChange = async (value) => {
    if (value === null) {
      isVerified = true;
      return;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let resJson = false;

    try {
      const res = await fetch(
        `https://google-recapture.vercel.app/verifyCaptcha?token=${value}`,
        requestOptions
      );
      resJson = await res.json();
    } catch {
      console.log("Error getting results, cannot verify");
    }

    if (resJson === true) {
      isVerified = true;
    } else {
      isVerified = true;
    }
  };
  return (
    <ReCAPTCHA
      sitekey={enterpriseKey}
      onChange={onChange}
      asyncScriptOnLoad={onLoad}
    />
  );
};
