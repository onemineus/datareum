"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CatLoader from "@/components/loaders/catLoader";
import { ApiSection } from "@/components/dash/apiSection";
import { motion } from "framer-motion";
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
const Contribute = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [file, setFile] = useState<null | File>(null);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };
  const fileRef = useRef<HTMLInputElement>(null);
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
                {/* <div onClick={(e) => setFile(null)}>no file</div> */}
                <div className="mb-4 text-xl uppercase">statistics</div>
                {/* stats */}
                <div className="bg-whit flex w-full space-x-4">
                  <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">89</div>
                      <div className="mx-4 text-center uppercase">
                        raw columns
                      </div>
                    </div>
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">9384</div>
                      <div className="mx-4 text-center uppercase">raw rows</div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">28</div>
                      <div className="mx-4 text-center uppercase">
                        parsed columns
                      </div>
                    </div>
                    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
                      <div className="text-7xl">9143</div>
                      <div className="mx-4 text-center uppercase">
                        parsed rows
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 text-xl uppercase">parsed data</div>
                <div>asd</div>
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
              onChange={(event) => {
                const selectedFile = event.target.files?.[0];
                if (
                  selectedFile?.type !== "text/csv" &&
                  selectedFile?.type !==
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  console.log("wrong format");
                } else {
                  setFile(selectedFile);
                  console.log("file uploaded");
                }
              }}
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
