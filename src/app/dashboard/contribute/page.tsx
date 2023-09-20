"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CatLoader from "@/components/loaders/catLoader";
import { ApiSection } from "@/components/dash/apiSection";
import { motion } from "framer-motion";
import Papa from "papaparse";
import waves from "../../../../public/waves.png";
import ProfileSection from "@/components/dash/profile";
import DashHeader from "@/components/headers/dashHeader";
import { unSigner } from "@/firebase/firebase";
import Toaster from "@/components/containers/Toaster";
import God from "@/components/dash/godSection";
import Container from "@/components/containers/container";
import ThemeButton from "@/components/custom/themeButton";
import AdminHeader from "@/components/headers/adminHeader";
import TableSection from "@/components/admin/tableSection";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoCloudUpload } from "react-icons/io5";
import {
  analyzeObjectList,
  calculateColumnCounts,
  processCsvData,
} from "@/utils/csvHelpers";
const Contribute = () => {
  const { user } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [file, setFile] = useState<null | File>(null);
  const [rawData, setRawData] = useState<object[] | unknown[] | null>(null);
  const [parsedData, setParsedData] = useState<object[] | null>(null);
  const [me, setMe] = useState([{}]);
  const [rawStats, setRawStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const [parsedStats, setParsedStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };
  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile?.type === "text/csv" ||
      selectedFile?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      if (selectedFile) {
        Papa.parse(selectedFile, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data: any = result.data;
            setRawData(data);
            console.log(data);
            const rawAnalytics = analyzeObjectList(data);
            // console.log(rawAnalytics);
            setRawStats(rawAnalytics);
            if (typeof data === "object") {
              const processed = processCsvData(data);
              setParsedData(processed);
              // console.log(processed);
              const parsedAnalytics = analyzeObjectList(processed);
              setParsedStats(parsedAnalytics);
              console.log(calculateColumnCounts(data, processed));
              setMe(calculateColumnCounts(data, processed));
            }
          },
        });
      }
    } else {
      console.log("wrong format");
    }
  };

  useEffect(() => {
    waiter();
    if (!user && !isLoading) {
      router.push("/");
    } else {
      setUserDataHelper();
    }
  }, [user, isLoading]);
  return !userData ? (
    <div>
      <CatLoader />
      <div
        onClick={() => {
          unSigner();
        }}
      >
        signout
      </div>
    </div>
  ) : !userData.isGod ? (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center justify-center text-zinc-50">
        <div className="text-2xl">
          Are you a <span className="font-bold">GOD</span>?
        </div>
        <div className="text-xl">{"- nah!"}</div>
        <div className="text-2xl">
          Go back{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => {
              router.push("/");
            }}
          >
            home.
          </span>
        </div>
      </div>
    </div>
  ) : (
    <Container>
      <div className="relative min-h-screen w-full">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            src={waves.src}
            alt="waves"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <AdminHeader />
        {file ? (
          // has file
          <div className="bg-pink-95 mih-h-screen flex w-full flex-col items-center pt-20">
            <div className="h-full w-full max-w-6xl p-4">
              <div className="bg-red-95 h-full">
                <div className="mb-4 text-xl uppercase">quick stats</div>
                {/* stats */}
                <div className="bg-whit flex w-full space-x-4">
                  <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">
                        {rawStats?.longestObjectLength}
                      </div>
                      <div className="mx-4 text-center uppercase">
                        raw columns
                      </div>
                    </div>
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">{rawData?.length}</div>
                      <div className="mx-4 text-center uppercase">raw rows</div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">
                        {parsedStats?.longestObjectLength}
                      </div>
                      <div className="mx-4 text-center uppercase">
                        parsed columns
                      </div>
                    </div>
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">{parsedData?.length}</div>
                      <div className="mx-4 text-center uppercase">
                        parsed rows
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 text-xl uppercase">analytics</div>
                <div className="h-72 w-full">
                  <ResponsiveContainer>
                    <AreaChart
                      width={500}
                      height={400}
                      data={me.splice(0, 100)}
                      margin={{
                        top: -30,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <Tooltip />
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="rawColumns"
                        stroke="#4E77FF"
                        fill="url(#colorUv)"
                      />
                      <Area
                        type="monotone"
                        dataKey="parsedColumns"
                        stroke="#FFDCCC"
                        fill="url(#colorPv)"
                      />
                      <Legend
                        iconType="diamond"
                        payload={[
                          {
                            value: "Raw Columns",
                            type: "diamond",
                            id: "rawColumns",
                            color: "#4E77FF",
                          },
                          {
                            value: "Parsed Columns",
                            type: "diamond",
                            id: "parsedColumns",
                            color: "#FFDCCC",
                          },
                        ]}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // no file
          <div className="bg-pink-95 flex h-screen w-full flex-col items-center pt-20">
            <div className="h-full w-full max-w-6xl p-4">
              <div
                onClick={(event) => {
                  fileRef.current?.click();
                }}
                className="relative flex h-full items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24">
                    <IoCloudUpload className="h-full w-full" />
                  </div>
                  <div>Select your file to get started</div>
                </div>
                <div className="absolute bottom-0 right-0 mx-2 my-1 text-sm">
                  .csv & .xlsx only
                </div>
              </div>
            </div>
            <input
              ref={fileRef}
              onChange={onFileChangeHandler}
              type="file"
              name="file"
              className="hidden"
              accept=".csv, .xlsx"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Contribute;
