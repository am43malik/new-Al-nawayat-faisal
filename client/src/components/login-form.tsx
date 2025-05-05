// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import logo from "@/public/logo.png";
// import { useFormState } from "react-dom";
// import login from "@/lib/actions/login";
// import { useAuthStore } from "@/store";
// import { Roles } from "@/constants";

// const LoginForm = () => {
//   const [isPending, startTransition] = React.useTransition();
//   const [passwordType, setPasswordType] = React.useState("password");
//   const setUser = useAuthStore((state) => state.setUser);

//   const router = useRouter();

//   const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
//   const togglePasswordType = () => {
//     if (passwordType === "text") {
//       setPasswordType("password");
//     } else if (passwordType === "password") {
//       setPasswordType("text");
//     }
//   };

//   const initialState = {
//     type: "",
//     message: "",
//   };

//   const [state, formAction] = useFormState(login, initialState);

//   if (state.type === "success" && state.role === Roles.USER) {
//     setUser({
//       role: state.role,
//     });
//     router.push("/");
//   } else if (state.type === "success") {
//     setUser({
//       role: state.role,
//     });
//     router.push("/dashboard");
//   } else {
//   }

//   return (
//     <div className="w-full py-10">
//       <Link href="/" className="inline-block">
//         <Image
//           src={logo}
//           alt="logo"
//           width={100}
//           height={100}
//           className="w-28"
//         />
//       </Link>
//       <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
//         Hey, Hello 👋
//       </div>
//       <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
//         Enter the login information.
//       </div>
//       <form action={formAction} className="mt-5 2xl:mt-7">
//         <div>
//           <Label htmlFor="email" className="mb-2 font-medium text-default-600">
//             Email
//           </Label>
//           <Input
//             disabled={isPending}
//             id="email"
//             type="email"
//             name="email"
//             className={cn("", {
//               "border-destructive": state.type === "error",
//             })}
//             size={!isDesktop2xl ? "xl" : "lg"}
//             required
//           />
//         </div>
//         {state.type === "error" && (
//           <div className=" text-destructive mt-2">{state.message}</div>
//         )}

//         <div className="mt-3.5">
//           <Label
//             htmlFor="password"
//             className="mb-2 font-medium text-default-600"
//           >
//             Password
//           </Label>
//           <div className="relative">
//             <Input
//               disabled={isPending}
//               id="password"
//               name="password"
//               type={passwordType}
//               className="peer "
//               size={!isDesktop2xl ? "xl" : "lg"}
//               placeholder="Password@123"
//               required
//             />

//             <div
//               className="absolute top-1/2 -translate-y-1/2 right-4  cursor-pointer"
//               onClick={togglePasswordType}
//             >
//               {passwordType === "password" ? (
//                 <Icon
//                   icon="heroicons:eye"
//                   className="w-5 h-5 text-default-400"
//                 />
//               ) : (
//                 <Icon
//                   icon="heroicons:eye-slash"
//                   className="w-5 h-5 text-default-400"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5  mb-8 flex flex-wrap gap-2">
//           <div className="flex-1 flex  items-center gap-1.5 ">
//             <Checkbox
//               size="sm"
//               className="border-default-300 mt-[1px]"
//               id="isRemebered"
//             />
//             <Label
//               htmlFor="isRemebered"
//               className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
//             >
//               Remember me
//             </Label>
//           </div>
//           <Link
//             href="/forget-password"
//             className="flex-none text-sm text-primary"
//           >
//             Forget Password?
//           </Link>
//         </div>
//         <Button
//           className="w-full"
//           disabled={isPending}
//           size={!isDesktop2xl ? "lg" : "md"}
//         >
//           {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           {isPending ? "Loading..." : "Sign In"}
//         </Button>
//         <Link
//           href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googlelogin`}
//           target="_self"
//         >
//           <Button
//             variant="outline"
//             color="secondary"
//             className="w-full mt-2"
//             disabled={isPending}
//             size={!isDesktop2xl ? "lg" : "md"}
//           >
//             <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
//               Sign in with
//               <svg
//                 stroke="currentColor"
//                 fill="currentColor"
//                 stroke-width="0"
//                 version="1.1"
//                 x="0px"
//                 y="0px"
//                 viewBox="0 0 48 48"
//                 enable-background="new 0 0 48 48"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill="#FFC107"
//                   d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
//                 ></path>
//                 <path
//                   fill="#FF3D00"
//                   d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
//                 ></path>
//                 <path
//                   fill="#4CAF50"
//                   d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
//                 ></path>
//                 <path
//                   fill="#1976D2"
//                   d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
//                 ></path>
//               </svg>
//             </span>
//           </Button>
//         </Link>

//         <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
//           Don&apos;t have an account?{" "}
//           <Link href="/register" className="text-primary">
//             {" "}
//             Sign Up{" "}
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Checkbox } from "@/components/ui/checkbox"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"
import Image from "next/image"
import logo from "@/public/logo.png"
import { useFormState } from "react-dom"
import login from "@/lib/actions/login"
import { useAuthStore } from "@/store"
import { Roles } from "@/constants"

const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition()
  const [passwordType, setPasswordType] = React.useState("password")
  const setUser = useAuthStore((state) => state.setUser)

  const router = useRouter()

  const isDesktop2xl = useMediaQuery("(max-width: 1530px)")
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password")
    } else if (passwordType === "password") {
      setPasswordType("text")
    }
  }

  const initialState = {
    type: "",
    message: "",
  }

  const [state, formAction] = useFormState(login, initialState)

  if (state.type === "success" && state.role === Roles.USER) {
    setUser({
      role: state.role,
    })
    router.push("/")
  } else if (state.type === "success") {
    setUser({
      role: state.role,
    })
    router.push("/dashboard")
  } else {
  }

  return (
    <div className="w-full max-w-md mx-auto py-10 px-6 sm:px-0">
      
      <div className="mt-8 text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
        Hey, Hello 👋
      </div>
      <div className="text-lg text-gray-600 mt-2 leading-6">Enter the login information.</div>
      <form action={formAction} className="mt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-gray-700">
              Email
            </Label>
            <Input
              disabled={isPending}
              id="email"
              type="email"
              name="email"
              className={cn("border-gray-300 focus:border-green-500 focus:ring-green-500", {
                "border-red-500": state.type === "error",
              })}
              size={!isDesktop2xl ? "xl" : "lg"}
              required
            />
          </div>

          {state.type === "error" && <div className="text-red-500 text-sm">{state.message}</div>}

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                disabled={isPending}
                id="password"
                name="password"
                type={passwordType}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                size={!isDesktop2xl ? "xl" : "lg"}
                placeholder="Password@123"
                required
              />

              <div className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" onClick={togglePasswordType}>
                {passwordType === "password" ? (
                  <Icon icon="heroicons:eye" className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Icon icon="heroicons:eye-slash" className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="isRemebered" className="border-gray-300 text-green-600 focus:ring-green-500" />
              <Label htmlFor="isRemebered" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link href="/forget-password" className="text-sm font-medium text-green-600 hover:text-green-700">
              Forget Password?
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-2.5 rounded-md"
            disabled={isPending}
            size={!isDesktop2xl ? "lg" : "md"}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Loading..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googlelogin`} target="_self">
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
              disabled={isPending}
              size={!isDesktop2xl ? "lg" : "md"}
            >
              <span className="flex items-center justify-center gap-2 font-medium">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="20"
                  width="20"
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
                Sign in with Google
              </span>
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
            Sign Up
          </Link>
        </div>
      </form>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#10b981"
            d="M44.9,-76.2C59.7,-69.7,74.1,-60.2,81.9,-46.4C89.8,-32.6,91.2,-14.5,89.1,2.1C87,18.8,81.5,33.9,72.7,47.2C63.9,60.5,51.8,71.9,37.7,77.4C23.6,82.9,7.5,82.5,-8.2,79.3C-23.9,76.1,-39.2,70.1,-51.7,60.4C-64.2,50.7,-73.9,37.3,-79.5,22C-85.1,6.7,-86.7,-10.5,-82.6,-26.2C-78.5,-41.9,-68.7,-56,-55.6,-63.2C-42.5,-70.4,-26.1,-70.7,-10.6,-70.1C4.9,-69.5,30.1,-82.7,44.9,-76.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#10b981"
            d="M39.9,-65.7C54.2,-60.5,70,-53.8,79.1,-41.8C88.2,-29.8,90.6,-12.4,87.7,3.4C84.8,19.2,76.5,33.5,66.2,45.5C55.9,57.5,43.5,67.3,29.7,72.9C15.9,78.5,0.6,80,-14.9,77.7C-30.4,75.4,-46.1,69.3,-58.4,58.7C-70.7,48.1,-79.6,33,-83.1,16.6C-86.6,0.2,-84.7,-17.5,-77.8,-32.6C-70.9,-47.7,-59,-60.2,-45,-67.1C-31,-74,-15.5,-75.3,-0.9,-73.9C13.7,-72.5,25.7,-70.9,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  )
}

export default LoginForm
