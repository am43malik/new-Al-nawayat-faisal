export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password: string;
  mobileNo: number;
  role: string;
  status: string;
  isVerified?: boolean;
  isActive?: boolean;
  stripeCustomerId?: string;
  designation?: string;
  FCMToken?: string;
  address: [
    {
      formatted_address: string;
      lat: number;
      lng: number;
      isDefault: boolean;
    }
  ];
  addedBy?: UserData;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryData {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface SubCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  categoryId: CategoryData;
  status: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface ProductData {
  _id: string;
  name: string;
  description: string;
  categoryId: CategoryData;
  subCategoryId: SubCategory;
  createdBy: UserData;
  brandId: Brand;
  status: string;
  isApproved: boolean;
  isActive: boolean;
  isFeatured: boolean;
  featureImg: string;
  images: string[];
  variants: {
    quantity: number;
    sku: string;
    mrp: number;
    rate: number;
    discount: number;
    attributes: [{ attributeId: IAttribute; value: string }];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Details {
  productId: ProductData;
  quantity: number;
  price: number;
  total: number;
  attributes: [{ id: string; name: string; value: string }];
}

export interface Order {
  _id: string;
  refId: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  details: Details[];
  userId: UserData;
  deliveryPersonId: UserData;
  orderBy: UserData;
  assignedTo: UserData;
  address: {
    formatted_address: string;
    lat: number;
    lng: number;
  };
  isPaid: boolean;
  isActive: boolean;
  isRequestingDeliveryPerson: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
  createdBy: UserData;
  status: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttribute {
  _id: string;
  name: string; // like sizes
  values: string[]; // For predefined values like sizes: ["S", "M", "L"]
  isActive: boolean;
  createdBy: UserData;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocation {
  _id: string;
  deliveryCharge: number;
  estDeliveryTime: number;
  estDeliveryTimeUnit: string;
  formatted_address: string;
  lat: number;
  lng: number;
  minOrderAmount: number;
  isActive: boolean;
  createdBy: UserData;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILanding {
  _id: string;
  images: string[];
  status: string;
  isActive: boolean;
  createdBy: UserData;
  createdAt: Date;
  updatedAt: Date;
}

export interface Counts {
  totalSales: number;
  todaysOrders: number;
  completedOrders: number;
  pendingOrders: number;
}

export interface Notification {
  _id: string;
  recipientId: UserData;
  recipientRole: string;
  orderId: Order;
  type: string;
  message: string;
  isRead: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
