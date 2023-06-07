import CommunityCard from "./components/community-card";
import CommunityCardContents from "./components/community-card-contents";
import { CommunityRepository } from "./repositores/community.repository";
import { formatNumber } from "./util/formatNumber";

export default async function Home() {
  const communityRepo = new CommunityRepository();
  await communityRepo.connect();
  let communities = await communityRepo.findAllCommunities();

  // filter out communities with 0 praises or <= 1 members
  communities = communities.filter(
    (community) => community.totalPraises > 0 && community.totalUsers > 1
  );

  //sort on praise given, top praisesLastWeek first
  communities.sort((a, b) => {
    if (a.praisesLastWeek > b.praisesLastWeek) {
      return -1;
    }
    if (a.praisesLastWeek < b.praisesLastWeek) {
      return 1;
    }
    return 0;
  });

  const totalPraisesLastWeek = communities.reduce(
    (acc, community) => acc + community.praisesLastWeek,
    0
  );

  return (
    <main>
      <div className="flex justify-center ">
        <div className="mx-5 prose prose-base md:prose-xl">
          <h1 className="text-center py-28">
            Last seven days, {formatNumber(communities.length)} communities gave
            a total of <u>{formatNumber(totalPraisesLastWeek)}</u> praise!
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full p-5 prose text-gray-800 prose-base max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2">
            {communities.map((community) => {
              return (
                <CommunityCard
                  key={community._id.toString()}
                  community={community}
                >
                  <CommunityCardContents community={community} />
                </CommunityCard>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60 * 60; // 1 hour
