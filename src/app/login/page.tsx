"use client";
import { Stack, TextField, Typography, Button } from "@mui/material";

import Header from "../components/header";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useRouter } from "next/navigation";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const onLogin = () => {
    axiosClient
      .post("/login", {
        email: email,
        pasword: password,
      })
      .then(({ data }) => {
        console.log({ data });
        const { success, userDetails } = data;
        if (!success) {
          setErrorMessage("Invalid Login Credentials.");
        } else {
          localStorage.setItem("role", userDetails.role);
          if (userDetails.role === "chief_admin") {
            router.push("/dashboard");
          } else {
            router.push("/details");
          }
        }
      })
      .catch(() => {
        setErrorMessage("Failed To Login.");
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
        <Stack
          sx={{ background: "#fff" }}
          width={"50vw"}
          height={"100vh"}
        ></Stack>
      </Stack>

      <Stack
        className="inner-container"
        sx={{
          height: "80%",
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
        <Stack width={"50%"} gap={"22px"} className="container-fields">
          <Typography fontSize={"24px"} fontWeight={500}>
            Login
          </Typography>
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onLogin();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={onLogin}
          >
            Login
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

export default Login;
