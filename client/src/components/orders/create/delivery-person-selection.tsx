"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/types";
import { getdeliveryPersons } from "@/lib/http/api";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";

export interface DeliveryPersonSelectionProps {
  selectedDeliveryPerson: UserData | null;
  onSelectDeliveryPerson: (deliveryPerson: UserData | null) => void;
  isAdmin?: boolean;
  isRequestingDeliveryPerson?: boolean;
  setIsRequestingDeliveryPerson?: any;
}

export const DeliveryPersonSelection: React.FC<
  DeliveryPersonSelectionProps
> = ({
  selectedDeliveryPerson,
  onSelectDeliveryPerson,
  isRequestingDeliveryPerson,
  setIsRequestingDeliveryPerson,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryPersons, setDeliveryPersons] = useState<UserData[]>([]);

  const { isVendor } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["getdeliveryPersons"],
    queryFn: async () => {
      return await getdeliveryPersons().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setDeliveryPersons(data);
    }
  }, [data]);

  const handleRequestDeliveryPerson = () => {
    setIsRequestingDeliveryPerson(true);
    // Clear any selected delivery person
    onSelectDeliveryPerson(null);
  };

  const handleCancelRequest = () => {
    setIsRequestingDeliveryPerson(false);
  };

  const filteredDeliveryPersons = deliveryPersons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Select Delivery Person</CardTitle>
          {isVendor && (
            <div className="space-x-2">
              {isRequestingDeliveryPerson ? (
                <Button variant="outline" onClick={handleCancelRequest}>
                  Cancel Request
                </Button>
              ) : (
                <Button variant="soft" onClick={handleRequestDeliveryPerson}>
                  Request Delivery Person
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isRequestingDeliveryPerson && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                A delivery person will be assigned to this order by the admin.
              </AlertDescription>
            </Alert>
          )}
          <Input
            type="search"
            placeholder="Search delivery persons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isRequestingDeliveryPerson}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchTerm &&
                filteredDeliveryPersons.map((person: UserData) => (
                  <TableRow key={person._id}>
                    <TableCell>
                      {person.firstName + " " + person.lastName}
                    </TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="soft"
                        color={person.FCMToken ? "success" : "destructive"}
                      >
                        {person.FCMToken ? "Online" : "Offline"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={
                          selectedDeliveryPerson?._id === person._id
                            ? "soft"
                            : "outline"
                        }
                        onClick={() => onSelectDeliveryPerson(person)}
                        disabled={isRequestingDeliveryPerson}
                      >
                        {selectedDeliveryPerson?._id === person._id
                          ? "Selected"
                          : "Select"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
