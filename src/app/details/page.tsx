"use client";
import { Stack, TextField, Typography, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "../components/header";
import { useState } from "react";
import axiosClient from "../axios";

import "./details.css"
const Details = () => {
  const [userDetails, setUserDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const round = searchParams.get("round");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onStartAssessment = () => {
    axiosClient
      .post("/registerUser", { userDetails })
      .then(({ data }) => {
        console.log({ data });
        if (data.success) {
          localStorage.setItem("user_id", data.user_id);
          router.push("/test");
        } else {
          setErrorMessage("Unable to start assessment");
        }
      })
      .catch((err) => {
        setErrorMessage("Unable to start assessment");
      });
  };

  return (
    <>
      <Stack>
        <Stack
          sx={{ background: "#3C81E8" }}
          width={"50vw"}
          height={"100vh"}
          className="main-container"
        >
          <Header />
          <Typography
            fontSize={"24px"}
            fontWeight={500}
            color={"#98EDF9"}
            marginLeft={"75px"}
          >
            Interview Assessment Tool
          </Typography>
        </Stack>
      </Stack>

      <Stack
        className="inner-container"
        sx={{
          height: "75%",
          width: "50%",
          borderRadius: "20px",
          background: "#fff",
          padding: "2px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          boxShadow: "0px 0px 10px 4px #B2B1B140",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack width={"500px"} gap={"22px"} className="container-fields">
          <Typography fontSize={"24px"} fontWeight={500}>
            Enter your details for Round {round ? round : 1} Assessment
          </Typography>
          <TextField placeholder="Name" name="name" onChange={handleChange} />
          <TextField placeholder="Email" name="email" onChange={handleChange} />
          <TextField
            placeholder="Mobile"
            type="number"
            name="mobile"
            onChange={handleChange}
          />
          <TextField
            placeholder="Designation/Job Profile"
            name="designation"
            onChange={handleChange}
          />
          <Button
            sx={{
              background: "#385CDD",
              color: "#fff",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#385CDD",
                color: "#fff",
              },
            }}
            onClick={onStartAssessment}
          >
            Start Assessment
          </Button>
          {errorMessage?.length ? (
            <Typography color={"red"} fontSize={"16px"} fontWeight={400}>
              {errorMessage}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
};

export default Details;
