import { column } from "@/components/data-tables/user/column";
import { UserListDataTable } from "@/components/data-tables/user/data-table";
import { TUser, UserActivationStatus, UserRole } from "@repo/utils/types";

export const dummyUsers: TUser[] = [
  {
    id: 1,
    role: UserRole.BUYER,
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "+11234567890",
    phonePrefixCode: "+1",
    emailVerified: true,
    phoneVerified: true,
    status: UserActivationStatus.ACTIVE,
    createdAt: new Date("2024-01-10T08:30:00Z"),
    updatedAt: new Date("2024-06-01T10:00:00Z"),
    avatarId: 101,
    avatarUrl: "https://example.com/avatars/alice.jpg",
  },
  {
    id: 2,
    role: UserRole.SELLER,
    fullName: "Bob Smith",
    email: "bob.smith@example.com",
    phoneNumber: "+441234567890",
    phonePrefixCode: "+44",
    emailVerified: false,
    phoneVerified: true,
    status: UserActivationStatus.INACTIVE,
    createdAt: new Date("2024-02-15T12:45:00Z"),
    avatarId: 102,
    avatarUrl: "https://example.com/avatars/bob.jpg",
  },
  {
    id: 3,
    role: UserRole.ADMIN,
    fullName: "Clara Zhang",
    email: "clara.zhang@example.com",
    phoneNumber: "+8613012345678",
    phonePrefixCode: "+86",
    emailVerified: true,
    phoneVerified: false,
    status: UserActivationStatus.BLOCKED,
    createdAt: new Date("2023-12-20T09:00:00Z"),
    updatedAt: new Date("2024-06-10T14:15:00Z"),
    avatarId: 103,
    avatarUrl: "https://example.com/avatars/clara.jpg",
  },
  {
    id: 4,
    role: UserRole.SELLER,
    fullName: "David Lee",
    email: "david.lee@example.com",
    phoneNumber: "+61234567890",
    phonePrefixCode: "+61",
    emailVerified: true,
    phoneVerified: true,
    status: UserActivationStatus.ACTIVE,
    createdAt: new Date("2024-03-05T07:20:00Z"),
  },
  {
    id: 5,
    role: UserRole.BUYER,
    fullName: "Emma Torres",
    email: "emma.torres@example.com",
    phoneNumber: "+33123456789",
    phonePrefixCode: "+33",
    emailVerified: false,
    phoneVerified: false,
    status: UserActivationStatus.INACTIVE,
    createdAt: new Date("2024-04-22T11:00:00Z"),
    avatarUrl: "https://example.com/avatars/emma.jpg",
  },
];

const UserListPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">User List</h1>
        <p className="text-accent-foreground text-sm font-medium">Manage your users and their account from here.</p>
      </div>
      <UserListDataTable columns={column} data={dummyUsers} isLoading={false} />
    </div>
  );
};

export default UserListPage;
