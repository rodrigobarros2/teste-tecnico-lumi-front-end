import { IUser } from "../modules/users";

export const compareDatesChronologically = (a: string, b: string): number => {
  const [monthA, yearA] = a.split("/");
  const [monthB, yearB] = b.split("/");

  if (yearA !== yearB) {
    return parseInt(yearA) - parseInt(yearB);
  }

  const months: Record<string, number> = {
    JAN: 0,
    FEV: 1,
    MAR: 2,
    ABR: 3,
    MAI: 4,
    JUN: 5,
    JUL: 6,
    AGO: 7,
    SET: 8,
    OUT: 9,
    NOV: 10,
    DEZ: 11,
  };

  return months[monthA] - months[monthB];
};

export const returnsOrganizedData = (users: IUser[]): void => {
  users.sort((a, b) => compareDatesChronologically(a.referenceMonth, b.referenceMonth));
};
