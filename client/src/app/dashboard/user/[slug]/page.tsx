// "use client";

// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Loader2, UserPlus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { addUser } from "@/lib/http/api";
// import { AxiosError } from "axios";
// import { useMutation } from "@tanstack/react-query";
// import BreadCrumb from "@/components/ui/breadcrumb";
// import toast from "react-hot-toast";
// import { Autocomplete, useLoadScript } from "@react-google-maps/api";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Roles } from "@/constants";

// const formSchema = z.object({
//   firstName: z.string().min(2, {
//     message: "firstName must be at least 2 characters.",
//   }),
//   lastName: z.string().min(2, {
//     message: "lastName must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   mobileNo: z.string().min(10, {
//     message: "Phone number must be at least 10 characters.",
//   }),
//   password: z.string(),
//   role: z.string(),
// });

// interface LocationState {
//   formatted_address: string;
//   lat: number;
//   lng: number;
// }

// const initialState: LocationState = {
//   formatted_address: "",
//   lat: 19.0759837,
//   lng: 72.8776559,
// };

// export default function Page() {
//   const router = useRouter();
//   const [formState, setFormState] = useState<LocationState>(initialState);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
//     libraries: ["places"],
//   });

//   const { mutate, isPending } = useMutation({
//     mutationKey: ["addUser"],
//     mutationFn: async (data: any) => {
//       return await addUser(data);
//     },
//     onSuccess: (data) => {
//       form.reset();
//       toast.success(data.data.message);
//       router.push("/dashboard/user");
//     },
//     onError(error, variables, context) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.errors[0].msg);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     },
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       mobileNo: "",
//       password: "",
//       role: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       mutate({
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         mobileNo: values.mobileNo,
//         address: {
//           formatted_address: formState.formatted_address,
//           lat: formState.lat,
//           lng: formState.lng,
//         },
//         password: values.password,
//         role: values.role,
//       });
//     } catch (error) {
//       toast.error("Something went wrong!");
//     }
//   }

//   const breadcrumbItems = [
//     { title: "Users", link: "/dashboard/user" },
//     { title: "Add User", link: "/dashboard/user/new" },
//   ];

//   const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
//     if (place.geometry && place.geometry.location) {
//       setFormState((prev) => ({
//         ...prev,
//         formatted_address: place.formatted_address || "",
//         lat: place!.geometry!.location!.lat(),
//         lng: place!.geometry!.location!.lng(),
//       }));
//     }
//   };

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <ScrollArea className="h-full">
//       <BreadCrumb items={breadcrumbItems} />
//       <div className="flex-1 space-y-4 py-5">
//         <div className="container mx-auto">
//           <Card className="max-w-5xl mx-auto">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                 <UserPlus className="h-6 w-6" />
//                 Add a New User
//               </CardTitle>
//               <CardDescription>Add a new user</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="firstName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>First Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., Acme Supplies"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Enter the First Name of the user.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="lastName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Last Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., Acme Supplies"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             Enter the Last Name of the user.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="e.g., contact@acmesupplies.com"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             The primary contact email for the user.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="mobileNo"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone Number</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="tel"
//                               placeholder="e.g., +1 (555) 123-4567"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormDescription>
//                             The primary contact number for the user.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="password"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Password</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g., Secure@123" {...field} />
//                           </FormControl>
//                           <FormDescription>Enter the Password.</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="role"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Role</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select user role" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value={Roles.RETAILER}>
//                                 retailer
//                               </SelectItem>
//                               <SelectItem value={Roles.USER}>user</SelectItem>
//                               <SelectItem value={Roles.ADMIN}>admin</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>Select user role</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="gird grid-cols-1 tems-center">
//                     <div>
//                       <Label htmlFor="location">Search Location</Label>
//                       <Autocomplete
//                         onLoad={(autocomplete) => {
//                           autocomplete.addListener("place_changed", () => {
//                             const place = autocomplete.getPlace();
//                             handlePlaceSelect(place);
//                           });
//                         }}
//                       >
//                         <Input
//                           id="location"
//                           placeholder="Search to update location"
//                         />
//                       </Autocomplete>
//                     </div>
//                     <div className="mt-6">
//                       <Label htmlFor="formatted-address">Address</Label>
//                       <Input
//                         id="formatted-address"
//                         value={formState.formatted_address}
//                         readOnly
//                       />
//                     </div>
//                   </div>

//                   <div className="flex justify-end">
//                     <Button
//                       type="submit"
//                       disabled={isPending}
//                       className="w-full sm:w-auto"
//                     >
//                       {isPending ? (
//                         <>
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           Adding user...
//                         </>
//                       ) : (
//                         "Add User"
//                       )}
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </ScrollArea>
//   );
// }

"use client";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Loader2, UserPlus, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addUser } from "@/lib/http/api";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import BreadCrumb from "@/components/ui/breadcrumb";
import toast from "react-hot-toast";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Roles } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";

const addressSchema = z.object({
  formatted_address: z.string(),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean().default(false),
});

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNo: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  password: z.string(),
  role: z.enum([Roles.RETAILER, Roles.USER, Roles.ADMIN]),
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
});

const initialState = {
  formatted_address: "",
  lat: 19.0759837,
  lng: 72.8776559,
};

type FormValues = z.infer<typeof formSchema> & {
  address?: {
    formatted_address: string;
    lat: number;
    lng: number;
    isDefault: boolean;
  };
};

export default function Page() {
  const router = useRouter();
  const [autocompletes, setAutocompletes] = useState<
    google.maps.places.Autocomplete[]
  >([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
      role: Roles.USER,
      addresses: [{ formatted_address: "", lat: 0, lng: 0, isDefault: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (data: Omit<FormValues, "address">) => {
      return await addUser(data);
    },
    onSuccess: (data) => {
      form.reset();
      toast.success(data.data.message);
      router.push("/dashboard/user");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg);
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const defaultAddress = values.addresses.find(
        (addr: { isDefault: any }) => addr.isDefault
      );
      if (defaultAddress) {
        values.address = defaultAddress;
      }
      const { address, ...dataToSend } = values;
      mutate(dataToSend);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    { title: "Add User", link: "/dashboard/user/new" },
  ];

  const handlePlaceSelect =
    (index: number) => (place: google.maps.places.PlaceResult) => {
      if (place.geometry && place.geometry.location) {
        const newAddress = {
          formatted_address: place.formatted_address || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          isDefault: index === 0,
        };
        form.setValue(`addresses.${index}`, newAddress);
      }
    };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex-1 space-y-4 py-5">
        <div className="container mx-auto">
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <UserPlus className="h-6 w-6" />
                Add a New User
              </CardTitle>
              <CardDescription>
                Add a new user with multiple addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Acme Supplies"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the First Name of the user.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Acme Supplies"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the Last Name of the user.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="e.g., contact@acmesupplies.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The primary contact email for the user.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobileNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="e.g., +1 (555) 123-4567"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The primary contact number for the user.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Secure@123" {...field} />
                          </FormControl>
                          <FormDescription>Enter the Password.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select user role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={Roles.RETAILER}>
                                retailer
                              </SelectItem>
                              <SelectItem value={Roles.USER}>user</SelectItem>
                              <SelectItem value={Roles.ADMIN}>admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Select user role</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Addresses</Label>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-2 p-4 border rounded-md"
                      >
                        <FormField
                          control={form.control}
                          name={`addresses.${index}.formatted_address`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address {index + 1}</FormLabel>
                              <Autocomplete
                                onLoad={(autocomplete) => {
                                  const newAutocompletes = [...autocompletes];
                                  newAutocompletes[index] = autocomplete;
                                  setAutocompletes(newAutocompletes);
                                  autocomplete.addListener(
                                    "place_changed",
                                    () => {
                                      const place = autocomplete.getPlace();
                                      handlePlaceSelect(index)(place);
                                    }
                                  );
                                }}
                              >
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Search to update location"
                                  />
                                </FormControl>
                              </Autocomplete>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`addresses.${index}.isDefault`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    if (checked) {
                                      form.setValue(
                                        "addresses",
                                        form
                                          .getValues("addresses")
                                          .map((addr, i) => ({
                                            ...addr,
                                            isDefault: i === index,
                                          }))
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Set as default address</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            color="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Address
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        append({
                          formatted_address: "",
                          lat: 0,
                          lng: 0,
                          isDefault: false,
                        })
                      }
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Another Address
                    </Button>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding user...
                        </>
                      ) : (
                        "Add User"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
