import type { RefObject } from "react";
import type { Location, GetManyLocationsQuery } from "../../graphql/_generated";

import LocationCard from "./location-card";

function LocationCardList({
  pages,
  topRef = null,
  bottomRef = null,
}: {
  pages: GetManyLocationsQuery[] | undefined;
  topRef?: RefObject<any> | null;
  bottomRef?: RefObject<any> | null;
}) {
  const allLocations: Location[] = [];
  pages?.forEach((page) => {
    if (!page.locations?.results) return;
    const currentLocations = page.locations.results as Location[];
    allLocations.push(...currentLocations);
  });

  return (
    <div className="flex flex-wrap justify-center">
      {allLocations.map((location, idx) => {
        let cardRef = null;
        if (idx === 0) {
          cardRef = topRef;
        }
        if (idx === allLocations.length - 1) {
          cardRef = bottomRef;
        }
        return (
          <LocationCard
            key={"l" + location!.id}
            location={location!}
            cardRef={cardRef}
          />
        );
      })}
    </div>
  );
}

export default LocationCardList;
