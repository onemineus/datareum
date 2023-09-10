"use client";

import CatLoader from "@/components/CatLoader";
import Selector from "@/components/Selector";
import { useAuth } from "@/context/context";
import { unSigner } from "@/firebase/firebase";
import { userData } from "@/types/types";
import { getDashUserData } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import waves from "../../../../public/waves.png";
import { Button } from "@/components/ui/button";
import TableSection from "@/components/tableSection";
import { columns, payments } from "@/utils/tableHelpers";
import AdminHeader from "@/components/adminHeader";

const AdminPanel = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
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
  ) : (
    // <CatLoader/>
    <Selector>
      <div className="relative min-h-screen w-full">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            src={waves.src}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <AdminHeader />
        <div className="bg-pink-95 w-full flex min-h-screen flex-col items-center pt-20">
          <div className="h-full w-full max-w-6xl px-4">
            <div className="h-96 w-full bg-red-500"></div>
            <TableSection columns={columns} data={payments} />
          </div>
        </div>
      </div>
    </Selector>
  );
};

export default AdminPanel;
