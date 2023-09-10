import { Payment, userData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
export const columns: ColumnDef<userData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "org",
    header: "Org",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "a",
    header: () => <div className="text-right">Options</div>,
    cell: ({ row }) => {
      const userData = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>View customer</DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}

              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const payments: userData[] = [
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  // ...
];
