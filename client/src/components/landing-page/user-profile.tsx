"use client";

import { useAuth } from "@/hooks/use-auth";
import { logoutAction } from "@/lib/actions/logout";
import { getProfile } from "@/lib/http/api";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuthStore } from "@/store";

const UserProfile = () => {
  const [getUser, setUser] = useState<UserData>();
  const router = useRouter();
  const setUserData = useAuthStore((state) => state.setUserData);

  const { data, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return await getProfile().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setUserData(data);
    }
  }, [data]);

  const { logoutSession } = useAuth();

  const logoutHandler = async () => {
    const logged = await logoutAction();

    if (logged.type === "success") {
      logoutSession();
      toast.success("Successfully logged out");
      router.push("/login");
    }

    if (logged.type === "error") {
      toast.error(logged.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          <Avatar>
            <AvatarImage
              src={
                getUser?.avatar
                  ? getUser?.avatar
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>
              {getUser?.firstName[0]}
              {getUser?.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          <Avatar>
            <AvatarImage
              src={
                getUser?.avatar
                  ? getUser?.avatar
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>
              {getUser?.firstName[0]}
              {getUser?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {getUser?.firstName + " " + getUser?.lastName}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              {getUser?.role}
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "My Orders",
              icon: "fluent:box-20-regular",
              href: "/my-orders",
            },
            {
              name: "profile",
              icon: "heroicons:user",
              href: "/profile",
            },
            // {
            //   name: "Billing",
            //   icon: "heroicons:megaphone",
            //   href: "/dashboard",
            // },

            // {
            //   name: "Keyboard shortcuts",
            //   icon: "heroicons:language",
            //   href: "/dashboard",
            // },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onClick={logoutHandler}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
