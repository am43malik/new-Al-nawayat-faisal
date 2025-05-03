"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
// import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
// import googleIcon from "@/public/images/auth/google.png";
// import facebook from "@/public/images/auth/facebook.png";
// import apple from "@/public/images/auth/apple.png";
// import twitter from "@/public/images/auth/twitter.png";
// import { SiteLogo } from "@/components/svg";
import { useMediaQuery } from "@/hooks/use-media-query";
import logo from "@/public/logo.png";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerApi } from "@/lib/http/api";
import { Roles } from "@/constants";

const schema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
  mobileNo: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

const RegForm = () => {
  const [address, setAddress] = useState({
    formatted_address: "",
    lat: 0,
    lng: 0,
  });

  const [passwordType, setPasswordType] = useState<string>("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["registerApi"],
    mutationFn: async (data: any) => {
      return await registerApi(data);
    },
    onSuccess: () => {
      reset();
      toast.success(
        `Your account has been created successfully. Please login to continue.`
      );
      router.push("/login");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const onSubmit = (data: any) => {
    mutate({ ...data, address, role: Roles.USER });
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      setAddress({
        formatted_address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <Link href="/" className="inline-block">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="w-28"
        />
      </Link>
      {/* <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div> */}
      {/* <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Create account
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-default-600 mb-3">
                First Name
              </Label>
              <Input
                disabled={isPending}
                id="firstName"
                type="text"
                size={!isDesktop2xl ? "xl" : "lg"}
                {...register("firstName")}
                className={cn(" ", {
                  "border-destructive": errors.firstName,
                })}
              />
              {errors.firstName && (
                <div className="text-destructive mt-2">
                  {errors.firstName.message as string}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-default-600 mb-3">
                Last Name
              </Label>
              <Input
                disabled={isPending}
                id="lastName"
                type="text"
                size={!isDesktop2xl ? "xl" : "lg"}
                {...register("lastName")}
                className={cn(" ", {
                  "border-destructive": errors.lastName,
                })}
              />
              {errors.lastName && (
                <div className="text-destructive mt-2">
                  {errors.lastName.message as string}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="mobileNo" className="text-default-600 mb-3">
              Mobile Number
            </Label>
            <Input
              disabled={isPending}
              id="mobileNo"
              type="tel"
              size={!isDesktop2xl ? "xl" : "lg"}
              {...register("mobileNo")}
              className={cn(" ", {
                "border-destructive": errors.mobileNo,
              })}
            />
            {errors.mobileNo && (
              <div className="text-destructive mt-2">
                {errors.mobileNo.message as string}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-default-600 mb-3">
              Email
            </Label>
            <Input
              disabled={isPending}
              id="email"
              type="tel"
              size={!isDesktop2xl ? "xl" : "lg"}
              {...register("email")}
              className={cn(" ", {
                "border-destructive": errors.email,
              })}
            />
            {errors.email && (
              <div className="text-destructive mt-2">
                {errors.email.message as string}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-default-600 mb-3">
              Password
            </Label>
            <div className="relative">
              <Input
                disabled={isPending}
                id="password"
                type={passwordType}
                size={!isDesktop2xl ? "xl" : "lg"}
                {...register("password")}
                className={cn(" ", {
                  "border-destructive": errors.password,
                })}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
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
            {errors.password && (
              <div className=" text-destructive mt-2">
                {errors.password.message as string}
              </div>
            )}
          </div>
        </div>

        <Button className="w-full mt-5" disabled={isPending} size="lg">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Registering..." : "Create an Account"}
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
              Sign Up With
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
      </form>
      {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full border-default-300 hover:bg-transparent"
        >
          <Image
            src={googleIcon}
            alt="google icon"
            className="w-5 h-5"
            priority={true}
          />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image
            src={facebook}
            alt="google icon"
            className="w-5 h-5"
            priority={true}
          />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image
            src={apple}
            alt="google icon"
            className="w-5 h-5"
            priority={true}
          />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image
            src={twitter}
            alt="google icon"
            className="w-5 h-5"
            priority={true}
          />
        </Button>
      </div> */}

      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Already Registered?{" "}
        <Link href="/login" className="text-primary">
          {" "}
          Sign In{" "}
        </Link>
      </div>
    </div>
  );
};

export default RegForm;
