import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ProductData } from "@/types";

interface CartItem extends ProductData {
  quantity: number;
  selectedAttributes: { attributeId: string; name: string; value: string }[];
}

interface CartProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
}) => {
  const total = cart.reduce((sum, item) => {
    const variant = item.variants[0]; // Using first variant as default
    return sum + variant.rate * item.quantity;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>MRP</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => {
                const variant = item.variants[0]; // Using first variant as default
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>₹  {variant.rate}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground line-through">
                        ₹  {variant.mrp}
                      </span>
                    </TableCell>
                    <TableCell>{variant.discount}%</TableCell>
                    <TableCell>
                      ₹  {(variant.rate * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <div className="mt-4 text-xl font-bold">Total: ₹  {total.toFixed(2)}</div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          Clear Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
