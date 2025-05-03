"use client";

import { useState } from "react";
import { ProductSearch } from "./product-search";
import { UserSelection } from "./user-selection";
import { DeliveryPersonSelection } from "./delivery-person-selection";
import { CheckoutForm } from "./checkout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { ProductData, UserData } from "@/types";
import { toast } from "react-hot-toast";

interface CartItem extends ProductData {
  quantity: number;
  selectedAttributes: { attributeId: string; name: string; value: string }[];
}

const CreateOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] =
    useState<UserData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRequestingDeliveryPerson, setIsRequestingDeliveryPerson] =
    useState(false);

  const addToCart = (
    product: ProductData,
    quantity: number,
    attributes: { attributeId: string; name: string; value: string }[]
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item._id === product._id &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
      );

      const variant = product.variants.find((v) =>
        v.attributes.every((attr) =>
          attributes.some(
            (selectedAttr) =>
              selectedAttr.attributeId === attr.attributeId._id &&
              selectedAttr.value === attr.value
          )
        )
      );

      if (!variant) {
        toast.error("Product variant not found");
        return prevCart;
      }

      const availableQuantity = variant.quantity;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > availableQuantity) {
          toast.error(
            `Not enough stock. Only ${
              availableQuantity - existingItem.quantity
            } more available.`
          );
          return prevCart;
        }
        return prevCart.map((item) =>
          item._id === product._id &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      if (quantity > availableQuantity) {
        toast.error(`Not enough stock. Only ${availableQuantity} available.`);
        return prevCart;
      }

      toast.success(`Added ${quantity} ${product.name} to cart`);

      return [
        ...prevCart,
        {
          ...product,
          quantity,
          selectedAttributes: attributes,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === productId) {
          const variant = item.variants.find((v) =>
            v.attributes.every((attr) =>
              item.selectedAttributes.some(
                (selectedAttr) =>
                  selectedAttr.attributeId === attr.attributeId._id &&
                  selectedAttr.value === attr.value
              )
            )
          );

          if (!variant) {
            toast.error("Product variant not found");
            return item;
          }

          if (quantity > variant.quantity) {
            toast.error(
              `Not enough stock. Only ${variant.quantity} available.`
            );
            return item;
          }

          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const steps = [
    {
      title: "Select User",
      content: (
        <UserSelection
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      ),
    },
    {
      title: "Select Products",
      content: (
        <ProductSearch
          addToCart={addToCart}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      ),
    },
    {
      title: "Select Delivery Person",
      content: (
        <DeliveryPersonSelection
          selectedDeliveryPerson={selectedDeliveryPerson}
          onSelectDeliveryPerson={setSelectedDeliveryPerson}
          setIsRequestingDeliveryPerson={setIsRequestingDeliveryPerson}
          isRequestingDeliveryPerson={isRequestingDeliveryPerson}
        />
      ),
    },
    {
      title: "Review & Checkout",
      content: (
        <CheckoutForm
          cart={cart}
          selectedUser={selectedUser}
          selectedDeliveryPerson={selectedDeliveryPerson}
          isRequestingDeliveryPerson={isRequestingDeliveryPerson}
        />
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Steps activeStep={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>
          <div className="mt-8">{steps[currentStep].content}</div>
          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 2 ? "Review Order" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateOrder;
