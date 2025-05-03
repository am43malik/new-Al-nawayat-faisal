"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useFormState } from "react-dom";
import login from "@/lib/actions/login";
import { useAuthStore } from "@/store";
import { Roles } from "@/constants";

const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const initialState = {
    type: "",
    message: "",
  };

  const [state, formAction] = useFormState(login, initialState);

  if (state.type === "success" && state.role === Roles.USER) {
    setUser({
      role: state.role,
    });
    router.push("/");
  } else if (state.type === "success") {
    setUser({
      role: state.role,
    });
    router.push("/dashboard");
  } else {
  }

  return (
    <div className="w-full py-10">
      <Link href="/" className="inline-block">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="w-28"
        />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter the login information.
      </div>
      <form action={formAction} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email
          </Label>
          <Input
            disabled={isPending}
            id="email"
            type="email"
            name="email"
            className={cn("", {
              "border-destructive": state.type === "error",
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
            required
          />
        </div>
        {state.type === "error" && (
          <div className=" text-destructive mt-2">{state.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              id="password"
              name="password"
              type={passwordType}
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder="Password@123"
              required
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 right-4  cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/forget-password"
            className="flex-none text-sm text-primary"
          >
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googlelogin`}
          target="_self"
        >
          <Button
            variant="outline"
            color="secondary"
            className="w-full mt-2"
            disabled={isPending}
            size={!isDesktop2xl ? "lg" : "md"}
          >
            <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
              Sign in with
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </span>
          </Button>
        </Link>

        <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
