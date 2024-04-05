"use client";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import Header from "../components/header";
import MuiButton from "../components/MuiButton";
import Question from "../components/Question";
import Timer from "../components/timer";
import axiosClient from "../axios/index";
import { useRouter, useSearchParams } from "next/navigation";

import "./test.css";

const Test = () => {
  const [answer, setAnswer] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRemainingTime, setLastRemainingTime] = useState(null);
  const candidateName = "Shubham Nautiyal";

  const router = useRouter();
  const searchParams = useSearchParams();

  const round = searchParams.get("round");

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/getAllQuestions")
      .then((data) => {
        setQuestions(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const onSubmitTest = () => {
    console.log({ answer });

    axiosClient
      .post("submitResponse", {
        answers: answer,
      })
      .then(({ data }) => {
        if (data.success) {
          router.push("/thankYou?round=2");
        }
      })
      .catch(() => {});
  };

  return (
    <Stack>
      <Stack
        className="main-container"
        sx={{
          background: "#3C81E8",
          height: "100vh",
          width: "25vw",
        }}
      >
        <Header />
        <Stack
          marginLeft={"28px"}
          marginTop={"10px"}
          gap={"8px"}
          className="heading"
        >
          <Typography fontWeight={500} fontSize={"18px"} color={"#fff"}>
            Interview Assessment Tool
          </Typography>
          <Typography fontWeight={500} fontSize={"18px"} color={"#fff"}>
            ( Round -{round || 1} )
          </Typography>
          {round === "2" ? (
            <Stack
            className="timer-container"
              sx={{
                height: "220px",
                width: "220px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #69E5F6 0%, #4AE676 100%)",
                padding: "2px",
                position: "absolute",
                top: "calc(50% - 110px)",
              }}
            >
              <Stack
                width={"100%"}
                height={"100%"}
                className="inner-timer"
                sx={{
                  borderRadius: "20px",
                  background: "#3C81E8",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "20px 0px",
                }}
              >
                <Timer
                  onTimerEnd={() => {
                    onSubmitTest();
                  }}
                  lastRemainingTime={lastRemainingTime}
                />
                <Typography fontSize={"16px"} fontWeight={500} color={"#fff"} className="timer-text">
                  Time Remaining
                </Typography>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Stack>

      <Stack
        height={"30vh"}
        className="inner-container"
        width={"30vw"}
        sx={{
          background: "#EAF3FF",
          position: "absolute",
          width: "70vw",
          height: "80vh",
          top: "50%",
          left: "55%",
          borderRadius: "20px",
          transform: "translate( -50% , -50%)",
        }}
      >
        <Stack
          flexDirection={"row"}
          gap={"8px"}
          padding={"20px"}
          className="container-fields"
        >
          <Typography fontSize={"16px"} fontWeight={500}>
            Assessment Questions
          </Typography>
          <Typography color={"rgba(0, 0, 0, 0.3)"}>|</Typography>
          <Typography fontWeight={400} fontSize={"14px"}>
            ( {Object.keys(answer)?.length}/{questions?.length}) Attempted
          </Typography>
        </Stack>
        <Stack
          height={"1px"}
          sx={{
            background: "rgba(0, 0, 0, 0.12)",
          }}
        />

        <Stack
          overflow={"auto"}
          height={"100%"}
          gap={"16px"}
          margin={"16px 22px 0px 22px"}
        >
          {loading ? (
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Stack>
          ) : (
            questions?.map((question, index) => {
              return (
                <Question
                  question={question}
                  key={question.key}
                  index={index}
                  answer={answer[question.key]}
                  onChecked={(option) => {
                    setAnswer({ ...answer, [question.key]: option });
                  }}
                />
              );
            })
          )}
        </Stack>
        <Stack
          height={"1px"}
          sx={{
            background: "rgba(0, 0, 0, 0.12)",
          }}
        />
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          padding={"13px"}
        >
          <Stack flexDirection={"row"}>
            <Typography
              color={"rgba(0, 0, 0, 0.6)"}
              fontSize={"16px"}
              fontWeight={400}
              alignSelf={"center"}
            >
              Candidate Name :
            </Typography>

            <Typography
              fontSize={"16px"}
              fontWeight={500}
              alignSelf={"center"}
              sx={{ marginLeft: "2px" }}
            >
              {candidateName}
            </Typography>
          </Stack>
          <MuiButton label={"Submit"} onClick={onSubmitTest} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Test;
