export interface Community {
  _id: string;
  name: string;
  hostname: string;
  totalPraises: number;
  totalUsers: number;
  logo: string;
  praisesLastWeek: number;
  praisesWeekBeforeLast: number;
  usersLastWeek: number;
  usersWeekBeforeLast: number;
}
