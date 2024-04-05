"use client"
import Image from "next/image";
import Header from "../components/header";
import {
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";

import { DASHBOARD_TABLE_COLUMNS, DASHBOARD_TABLE_DATA } from "./constant";
import { useRouter } from "next/navigation";

const RowContent = ({ row }) => {
  return (
    <>
      {DASHBOARD_TABLE_COLUMNS.map((column) => (
        <TableCell
          key={column.key}
          // align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.key]}
        </TableCell>
      ))}
    </>
  );
};

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <Stack
        sx={{
          background: "rgba(60, 129, 232, 1)",
          width: "100vw",
          height: "150px",
        }}
      >
        <Stack
          sx={{
            paddingLeft: "26px",
            paddingTop: "36px",
            flexDirection: "row",
          }}
        >
          <Image src="/logo.svg" alt="Logo" width={75} height={75} priority />
          <Typography
            color={"#fff"}
            fontSize={"28px"}
            fontWeight={600}
            width={"100%"}
            textAlign={"center"}
            alignSelf={"center"}
          >
            Interview Assessment Tool
          </Typography>
        </Stack>
      </Stack>
      <Stack padding={"36px 26px"} width={"100%"} height={"100%"}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography fontWeight={600} fontSize={"20px"}>
            Result
          </Typography>
          <Typography fontSize={"14px"} fontWeight={400}>
            Date: {new Date().toDateString()}
          </Typography>
        </Stack>
        <Button
          sx={{
            background: "rgba(60, 129, 232, 1)",
            color: "#fff",
            width: "max-content",
            margin: "10px 0px",
            padding: "10px",
          }}
          onClick={()=>{
            router.push("/details")
          }}
        >
          Add new User
        </Button>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {DASHBOARD_TABLE_COLUMNS.map((column) => (
                  <TableCell
                    sx={{
                      background: "#F2F2F2",
                    }}
                    key={column.key}
                    // align={column.align}
                    // style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {DASHBOARD_TABLE_DATA?.map((data) => {
                return (
                  <TableRow key={data.candidate_name}>
                    <RowContent row={data} />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default Dashboard;
