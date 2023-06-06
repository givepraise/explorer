import CommunityCard from "./community-card";
import CommunityCardContents from "./community-card-contents";
import { CommunityRepository } from "../repositores/community.repository";

export default async function CommunityGrid() {
  const communityRepo = new CommunityRepository();
  await communityRepo.connect();
  const communities = await communityRepo.findAllCommunities();
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
