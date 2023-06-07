import { Community } from "../interfaces/community.interface";
import { formatNumber } from "../util/formatNumber";
import { percentageChange } from "../util/percentageChange";

export type UsersRowProps = {
  community: Community;
};

export default function UsersRow({ community }: UsersRowProps) {
  const change = percentageChange(
    community.usersLastWeek,
    community.usersWeekBeforeLast
  );
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>Users</div>
        <div className="text-gray-400">Last 7 days</div>
      </div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold">
          {formatNumber(community.totalUsers)}
        </div>
        <div className="pt-2">
          <span className="mr-1 font-bold">
            {formatNumber(community.usersLastWeek)}
          </span>
          {change === 0 ? (
            <span className="text-gray-400">→0%</span>
          ) : change > 0 ? (
            <span className="text-[#1DAB5F]">
              {`↑${formatNumber(change)}%`}{" "}
            </span>
          ) : (
            <span className="text-red-700">{`↓${formatNumber(change)}%`}</span>
          )}
        </div>
      </div>
    </div>
  );
}
