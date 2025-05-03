// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import { useEffect, useState } from "react";
// import type { ILanding } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import { getActiveSliders, getSliders } from "@/lib/http/api";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// // Import custom styles
// import "./styles.css";
// import Link from "next/link";

// export function Hero() {
//   const [getData, setData] = useState<ILanding[]>([]);

//   const { data, isLoading } = useQuery({
//     queryKey: ["getActiveSliders"],
//     queryFn: async () => {
//       return await getActiveSliders({ type: "slider" }).then((res) => res.data);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setData(data);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section className="relative w-full h-[600px] md:h-[700px]">
//       <Link href="/abc">
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           pagination={{
//             clickable: true,
//             bulletActiveClass: "swiper-pagination-bullet-active",
//           }}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           loop={true}
//           className="h-full hero-slider"
//         >
//           {getData.length > 0 &&
//             getData[0].images.map((imageUrl, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative h-full w-full">
//                   <Image
//                     src={imageUrl}
//                     alt={`Slider image ${index + 1}`}
//                     layout="fill"
//                     objectFit="cover"
//                     priority={index === 0}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </Link>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import type { ILanding } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getActiveSliders } from "@/lib/http/api";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import custom styles
import "./styles.css";

export function Hero() {
  const [getData, setData] = useState<ILanding[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getActiveSliders"],
    queryFn: async () => {
      return await getActiveSliders({ type: "slider" }).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative w-full aspect-[16/9] max-h-[800px] pt-[64px] md:pt-[80px]">
   
      <Link href="/abc">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full hero-slider"
        >
          {getData.length > 0 &&
            getData[0].images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Slider image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Link>
    </section>
  );
}
