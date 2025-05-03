export const Roles = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  VENDOR: "vendor",
  RETAILER: "retailer",
  USER: "user",
  DELIVERY_PERSON: "deliveryPerson",
} as const;

export const OderStatus = {
  OUT_FOR_DELIVERY: "out_for_delivery", // Order is out for delivery
  DELIVERED: "delivered", // Order successfully delivered
  COMPLETED: "completed", // Order is completed and closed
  CANCELLED: "cancelled", // Order has been cancelled by user/admin
  RETURNED: "returned", // Order returned by the customer
  REFUNDED: "refunded", // Refund issued for a returned/cancelled order
  INTRANSIT: "in_transit",
  DISPATCH: "dispatch",
  REQUEST_FOR_DELIVERY: "request_for_delivery",
} as const;

export enum RolesEnum {
  ADMIN = "admin",
  SUPER_ADMIN = "superAdmin",
  VENDOR = "vendor",
  USER = "user",
}

// Create a type from the enum values
export type RoleType = `${RolesEnum}`;
