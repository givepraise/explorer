import CommunityCard from "./community-card";
import CommunityCardContents from "./community-card-contents";
import { CommunityRepository } from "../repositores/community.repository";

export default async function CommunityGrid() {
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

  return (
    <>
      {communities.map((community) => {
        return (
          <CommunityCard key={community._id.toString()} community={community}>
            <CommunityCardContents community={community} />
          </CommunityCard>
        );
      })}
    </>
  );
}
