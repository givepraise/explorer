import { MongoClient, ObjectId } from "mongodb";

import Image from "next/image";
import { subDays } from "date-fns";

const MONGO_DB = process.env.MONGO_DB || "";
const MONGO_URI = process.env.MONGO_URI || "";
const MAIN_MONGO_URI = MONGO_URI.replace("{db}", MONGO_DB);

interface Community {
  _id: ObjectId;
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

function percentageChange(dividend: number, divisor: number): number {
  // Returns percentage change in praises
  if (divisor === 0) {
    return dividend > 0 ? 100 : 0;
  }

  return (dividend / divisor) * 100;
}

class CommunityRepository {
  client: MongoClient;

  constructor() {
    this.client = new MongoClient(MAIN_MONGO_URI);
  }

  async connect() {
    await this.client.connect();
  }

  async findAllCommunities(): Promise<Community[]> {
    const db = this.client.db(MONGO_DB);
    const communityCollection = db.collection<Community>("communities");
    let communities = await communityCollection.find().toArray();
    for (let community of communities) {
      await this.populateCommunityData(community);
    }
    return communities;
  }

  async populateCommunityData(community: Community): Promise<void> {
    // db name is the hostname with dots replaced with dashes
    const dbName = community.hostname.replace(/\./g, "-");

    // switch to dbName
    const communityDB = this.client.db(dbName);

    // populate data
    community.totalPraises = await this.getTotalPraises(communityDB);
    community.totalUsers = await this.getTotalUsers(communityDB);
    community.logo = await this.getLogo(communityDB);
    community.praisesLastWeek = await this.getPraisesLastWeek(communityDB);
    community.praisesWeekBeforeLast = await this.getPraisesWeekBeforeLast(
      communityDB
    );
    community.usersLastWeek = await this.getUsersLastWeek(communityDB);
    community.usersWeekBeforeLast = await this.getUsersWeekBeforeLast(
      communityDB
    );
  }

  async getTotalPraises(db: any): Promise<number> {
    const praiseCollection = db.collection("praises");
    return await praiseCollection.countDocuments();
  }

  async getTotalUsers(db: any): Promise<number> {
    const userCollection = db.collection("users");
    return await userCollection.countDocuments();
  }

  async getLogo(db: any): Promise<string> {
    const settingsCollection = db.collection("settings");
    const logoSetting = await settingsCollection.findOne({ key: "LOGO" });
    return logoSetting?.value;
  }

  async getPraisesLastWeek(db: any): Promise<number> {
    const praiseCollection = db.collection("praises");
    const oneWeekAgo = subDays(new Date(), 7);
    return await praiseCollection.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });
  }

  async getPraisesWeekBeforeLast(db: any): Promise<number> {
    const praiseCollection = db.collection("praises");
    const twoWeeksAgo = subDays(new Date(), 14);
    const oneWeekAgo = subDays(new Date(), 7);
    return await praiseCollection.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo },
    });
  }

  async getUsersLastWeek(db: any): Promise<number> {
    const userCollection = db.collection("users");
    const oneWeekAgo = subDays(new Date(), 7);
    return await userCollection.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });
  }

  async getUsersWeekBeforeLast(db: any): Promise<number> {
    const userCollection = db.collection("users");
    const twoWeeksAgo = subDays(new Date(), 14);
    const oneWeekAgo = subDays(new Date(), 7);
    return await userCollection.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo },
    });
  }
}

export default async function Communities() {
  const communityRepo = new CommunityRepository();
  await communityRepo.connect();
  const communities = await communityRepo.findAllCommunities();
  return (
    <>
      {communities.map((community) => {
        return (
          <div
            key={community._id.toString()}
            className="inline-block p-5 border bg-slate-100"
          >
            <Image
              width={100}
              height={100}
              alt={community.name}
              className="mt-0 mb-5"
              src={`${process.env.PINATA_DEDICATED_GATEWAY}${community.logo}`}
            />
            Name:{" "}
            <a href={`https://${community.hostname}`} target="_blank">
              {community.name}
            </a>
            <br />
            Total number of praise: {community.totalPraises}
            <br />
            Number of praise last 7 days: {community.praisesLastWeek} (
            {percentageChange(
              community.praisesLastWeek,
              community.praisesWeekBeforeLast
            )}
            %)
            <br />
            Number of users: {community.totalUsers}
            <br />
            Number of users last 7 days: {community.usersLastWeek} (
            {percentageChange(
              community.usersLastWeek,
              community.usersWeekBeforeLast
            )}
            %)
            <br />
          </div>
        );
      })}
    </>
  );
}
