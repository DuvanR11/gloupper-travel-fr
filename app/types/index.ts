import { Center, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Center, "createdAt" | "updatedAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "updatedAt" | "center"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  updatedAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
