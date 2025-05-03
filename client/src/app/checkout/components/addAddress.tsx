// import { LoaderCircle, Plus } from "lucide-react";
// import React, { useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Form } from "@/components/ui/form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Autocomplete, useLoadScript } from "@react-google-maps/api";
// import { AxiosError } from "axios";
// import { updateAddress } from "@/lib/http/api";
// import toast from "react-hot-toast";

// const formSchema = z.object({
//   address: z.string().min(2, {
//     message: "Address must be at least 2 characters.",
//   }),
// });

// const AddAdress = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [address, setAddress] = useState({
//     formatted_address: "",
//     lat: 0,
//     lng: 0,
//   });

//   const addressForm = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
//     libraries: ["places"],
//   });

//   const queryClient = useQueryClient();

//   const updateProfileMutation = useMutation({
//     mutationFn: updateAddress,
//     onSuccess: () => {
//       addressForm.reset();
//       setIsModalOpen(false);
//       toast.success("New Addreess Added successfully");
//       queryClient.invalidateQueries({ queryKey: ["getProfile"] });
//     },
//     onError(error, variables, context) {
//       if (error instanceof AxiosError) {
//         toast.error(error.response?.data.errors[0].msg);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     },
//   });

//   const handleAddressAdd = () => {
//     updateProfileMutation.mutate({
//       formatted_address: address.formatted_address,
//       lat: address.lat,
//       lng: address.lng,
//     });
//   };

//   const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
//     if (place.geometry && place.geometry.location) {
//       setAddress({
//         formatted_address: place.formatted_address || "",
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }
//   };

//   const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
//     null
//   );

//   if (!isLoaded) return null;

//   return (
//     <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//       <DialogTrigger asChild>
//         <Button size={"sm"} variant="outline">
//           <Plus size={"16"} />
//           <span className="ml-2">Add New Address</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <Form {...addressForm}>
//           <form onSubmit={handleAddressAdd}>
//             <DialogHeader>
//               <DialogTitle>Add Address</DialogTitle>
//               <DialogDescription>
//                 We can save your address for next time order.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="location">Search Location</Label>
//                 <div className="relative z-[9999]">
//                   <Autocomplete
//                     onLoad={(autocompleteInstance) => {
//                       autocompleteRef.current = autocompleteInstance;
//                     }}
//                     onPlaceChanged={() => {
//                       const place = autocompleteRef.current?.getPlace();
//                       if (place) handlePlaceSelect(place);
//                     }}
//                   >
//                     <Input
//                       id="location"
//                       placeholder="Search to update location"
//                       className="w-full"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") e.preventDefault(); // Prevent form submit on Enter
//                       }}
//                     />
//                   </Autocomplete>
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="formatted-address">Current Address</Label>
//                 <Input
//                   id="formatted-address"
//                   value={address.formatted_address}
//                   readOnly
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 className="mt-1.5"
//                 type="submit"
//                 disabled={updateProfileMutation.isPending}
//               >
//                 {updateProfileMutation.isPending ? (
//                   <span className="flex items-center gap-2">
//                     <LoaderCircle className="animate-spin" />
//                     <span>Please wait...</span>
//                   </span>
//                 ) : (
//                   "Save changes"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddAdress;



"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { LoaderCircle, Plus } from "lucide-react"
import React, { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Autocomplete, useLoadScript } from "@react-google-maps/api"
import { AxiosError } from "axios"
import { updateAddress } from "@/lib/http/api"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  storeName: z.string().optional(),
  addressLine1: z.string().min(2, {
    message: "Address line 1 must be at least 2 characters.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  postalCode: z.string().min(2, {
    message: "Postal code must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  addressType: z.enum(["home", "work", "other"]),
  formatted_address: z.string(),
  lat: z.number(),
  lng: z.number(),
})

type FormValues = z.infer<typeof formSchema>

const AddAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [address, setAddress] = useState({
    formatted_address: "",
    lat: 0,
    lng: 0,
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      addressType: "home",
      formatted_address: "",
      lat: 0,
      lng: 0,
    },
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      form.reset()
      setIsModalOpen(false)
      toast.success("New Address Added successfully")
      queryClient.invalidateQueries({ queryKey: ["getProfile"] })
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.errors[0].msg)
      } else {
        toast.error("Something went wrong!")
      }
    },
  })

  const onSubmit = (data: FormValues) => {
    updateProfileMutation.mutate({
      storeName: data.storeName,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      addressType: data.addressType,
      formatted_address: address.formatted_address,
      lat: address.lat,
      lng: address.lng,
    })
  }

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      // Update the address state
      setAddress({
        formatted_address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })

      // Parse address components
      const addressComponents = place.address_components || []
      let street = ""
      let city = ""
      let state = ""
      let postalCode = ""
      let country = ""

      for (const component of addressComponents) {
        const types = component.types

        if (types.includes("street_number")) {
          street = component.long_name
        } else if (types.includes("route")) {
          street += street ? ` ${component.long_name}` : component.long_name
        } else if (types.includes("locality")) {
          city = component.long_name
        } else if (types.includes("administrative_area_level_1")) {
          state = component.long_name
        } else if (types.includes("postal_code")) {
          postalCode = component.long_name
        } else if (types.includes("country")) {
          country = component.long_name
        }
      }

      // Update form fields
      form.setValue("addressLine1", street)
      form.setValue("city", city)
      form.setValue("state", state)
      form.setValue("postalCode", postalCode)
      form.setValue("country", country)
      form.setValue("formatted_address", place.formatted_address || "")
      form.setValue("lat", place.geometry.location.lat())
      form.setValue("lng", place.geometry.location.lng())
    }
  }

  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null)

  // Get user's current location when the website opens
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords

            try {
              // Use Google Maps Geocoding API to get address from coordinates
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
              )

              const data = await response.json()

              if (data.results && data.results.length > 0) {
                const place = data.results[0]
                handlePlaceSelect(place as google.maps.places.PlaceResult)
              }
            } catch (error) {
              console.error("Error getting address from coordinates:", error)
            }
          },
          (error) => {
            console.error("Error getting user location:", error)
          },
        )
      }
    }

    // Only request location when modal is opened
    if (isModalOpen && isLoaded) {
      getUserLocation()
    }
  }, [isModalOpen, isLoaded])

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps...</div>

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          <Plus size={"16"} />
          <span className="ml-2">Add New Address</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>We can save your address for your next order.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="location">Search Location</Label>
                <div className="relative z-[9999]">
                  <Autocomplete
                    onLoad={(autocompleteInstance) => {
                      autocompleteRef.current = autocompleteInstance
                    }}
                    onPlaceChanged={() => {
                      const place = autocompleteRef.current?.getPlace()
                      if (place) handlePlaceSelect(place)
                    }}
                  >
                    <Input
                      id="location"
                      placeholder="Search to update location"
                      className="w-full"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault() // Prevent form submit on Enter
                      }}
                    />
                  </Autocomplete>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Store name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select address type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment, suite, unit, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="State/Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="formatted-address">Full Address</Label>
                <Input id="formatted-address" value={address.formatted_address} readOnly />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <span>Please wait...</span>
                  </span>
                ) : (
                  "Save Address"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAddress
