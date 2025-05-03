export interface DataRows {
  id: string;
  name: string;
  category: string;
  createdBy: string;
  createdAt: string;
  image: string;
  status: string;
  price: number;
}

export const productsData = [
  {
    id: 1,
    name: "Navy Blue Formal Blazer",
    category: "Formal Wear",
    createdBy: "Super Admin",
    createdAt: "Dec 24, 2024",
    image:
      "https://img.freepik.com/premium-photo/handsome-young-businessman_917213-122630.jpg?ga=GA1.1.1840529326.1725314483&semt=ais_hybrid",
    price: 3500,
    status: "Active",
  },
  {
    id: 2,
    name: "Traditional Handwoven Kurta",
    category: "Ethnic Wear",
    createdBy: "Super Admin",
    createdAt: "Dec 24, 2024",
    image:
      "https://img.freepik.com/premium-photo/man-black-dress-stands-front-green-background_278224-240.jpg?ga=GA1.1.1840529326.1725314483&semt=ais_hybrid",
    price: 800,
    status: "Active",
  },
  {
    id: 3,
    name: "Classic White T-Shirt",
    category: "Casual Wear",
    createdBy: "Super Admin",
    createdAt: "Dec 24, 2024",
    image:
      "https://img.freepik.com/free-photo/indian-man-simple-white-tee-studio-portrait_53876-102833.jpg?t=st=1735464757~exp=1735468357~hmac=f8e9f0aed529ff236be140b7a6713e31ddb52ed48dbde836b944e06c4a2b02ea&w=360",
    price: 450,
    status: "Active",
  },
];

// import { faker } from "@faker-js/faker";

// export const users1 = [
//   {
//     id: 1,
//     user: {
//       name: "Lindsay Walton",
//       avatar: faker.image.avatarLegacy(),
//       title: "Front-end Developer",
//       email: "lindsay.walton@example.com",
//     },
//     title: "Front-end Developer",
//     email: "lindsay.walton@example.com",
//     role: "member",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
//   {
//     id: 2,
//     user: {
//       name: "Courtney Henry	",
//       avatar: faker.image.avatarLegacy(),
//       title: "Designer",
//       email: "courtney.henry@example.com",
//     },
//     title: "Designer",
//     email: "courtney.henry@example.com",
//     role: "admin",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
//   {
//     id: 3,
//     user: {
//       name: "Tom Cook	",
//       avatar: faker.image.avatarLegacy(),
//       title: "Director of Product	",
//       email: "tom.cook@example.com	",
//     },
//     title: "Director of Product",
//     email: "tom.cook@example.com	",
//     role: "member",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
//   {
//     id: 4,
//     user: {
//       name: "Whitney Francis",
//       avatar: faker.image.avatarLegacy(),
//       title: "Copywriter	",
//       email: "whitney.francis@example.com	",
//     },
//     title: "Copywriter",
//     email: "whitney.francis@example.com	",
//     role: "admin",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
//   {
//     id: 5,
//     user: {
//       name: "Leonard Krasner",
//       avatar: faker.image.avatarLegacy(),
//       title: "Senior Designer		",
//       email: "leonard.krasner@example.com	",
//     },
//     title: "Senior Designer	",
//     email: "leonard.krasner@example.com	",
//     role: "owner",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
//   {
//     id: 6,
//     user: {
//       name: "Floyd Miles	",
//       avatar: faker.image.avatarLegacy(),
//       title: "Principal Designer		",
//       email: "floyd.miles@example.com		",
//     },
//     title: "Principal Designer	",
//     email: "floyd.miles@example.com	",
//     role: "member",
//     action: null,
//     details: {
//       city: faker.location.cardinalDirection(),
//       experience: " 2 Years",
//       post: faker.company.buzzAdjective(),
//     },
//   },
// ];
