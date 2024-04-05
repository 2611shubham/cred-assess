"use client";
import Image from "next/image";
import Header from "../components/header";
import { useSearchParams } from "next/navigation";

const ThankYou = () => {
  const searchParams = useSearchParams();

  const round = searchParams.get("round");

  return (
    <div
      style={{
        background: "rgba(60, 129, 232, 1)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          position: "absolute",
          height: "70%",
          width: "40%",
          background: "#fff",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginTop: "45px",
          }}
        >
          Assessment Result
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {`( Round ${round} )`}
        </div>

        <Image
          src="/assessment.svg"
          alt="Logo"
          width={"240"}
          height={"200"}
          priority
          style={{
            marginTop: "40px",
          }}
        />
        <div
          style={{
            fontSize: "48px",
            fontWeight: "500",
            color: "#2AE1C0",
          }}
        >
          Thank You
        </div>

        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            bottom: "20px",
          }}
        >
          Note : Your Assessment result is under review. Will inform you shortly
          via mail.
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
