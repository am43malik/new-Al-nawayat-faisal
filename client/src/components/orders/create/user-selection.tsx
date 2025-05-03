"use client";

import { useEffect, useState } from "react";
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
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getUsersByForDashboard } from "@/lib/http/api";
import { Roles } from "@/constants";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserSelectionProps {
  selectedUser: UserData | null;
  onSelectUser: (user: UserData) => void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({
  selectedUser,
  onSelectUser,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [getUser, setUser] = useState<UserData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getUsersByForDashboard"],
    queryFn: async () => {
      return await getUsersByForDashboard().then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const filteredUsers = getUser.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Select User</CardTitle>
          <Button onClick={() => router.push("/dashboard/user/new")}>
            <Plus className="w-4 h-4 text-primary-foreground mr-1" />
            Add User
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchTerm &&
                filteredUsers.map((user: UserData) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.firstName + " " + user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant={
                          selectedUser?._id === user._id ? "soft" : "outline"
                        }
                        onClick={() => onSelectUser(user)}
                      >
                        {selectedUser?._id === user._id ? "Selected" : "Select"}
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
