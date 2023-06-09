import { Community } from "../interfaces/community.interface";
import Image from "next/image";
import ImageWithFallback from "./image-with-fallback";
import PraiseRow from "./praise-row";
import UsersRow from "./users-row";

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/(^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
}

export type CommunityCardContentsProps = {
  community: Community;
};

export default function CommunityCardContents({
  community,
}: CommunityCardContentsProps) {
  return (
    <>
      <div className="clear-both h-20 mb-6 whitespace-nowrap">
        <ImageWithFallback
          width={80}
          height={80}
          alt={community.name}
          className="float-left my-0 mr-4 rounded-full"
          src={`${process.env.PINATA_DEDICATED_GATEWAY}${community.logo}`}
        />
        <div className="text-2xl font-bold leading-10 overflow-clip">
          {toTitleCase(community.name)}
        </div>
        <div className="overflow-clip">
          <a
            href={`https://${community.hostname}`}
            target="_blank"
            className="text-[#D32F7D]"
          >
            {community.hostname}
          </a>
        </div>
      </div>
      <PraiseRow community={community} />
      <div className="my-3 border-t border-gray-300"></div>
      <UsersRow community={community} />
    </>
  );
}
