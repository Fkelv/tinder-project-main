import { useEffect, useState } from "react";
import { Swipe, getMatches, hotelData, swipes } from "../../data";
import { HotelCard } from "./hotel-card";
import SwipeViewContainer from "./swipe-view";
import ShareModal from "./share-modal";
import { Query } from "../types";

export default function MatchesView({ query }: { query: Query }) {
  const [hotelIDs, setHotelIDs] = useState<null | string[]>(null);
  const [restart, setRestart] = useState(false);
  const [share, setShare] = useState(false);
  const [showMatchOverlay, setShowMatchOverlay] = useState(true); // State for controlling the match overlay

  useEffect(() => {
    const friendsSwipes: Swipe[] = query
      ? [
          ...query.left.map((id): Swipe => {
            return { id, direction: "left" };
          }),
          ...query.right.map((id): Swipe => {
            return { id, direction: "right" };
          }),
        ]
      : [];
    getMatches(swipes, friendsSwipes).then((res) => {
      setHotelIDs(res);
      setTimeout(() => {
        setShowMatchOverlay(false); // Hide the match overlay after a delay
      }, 3000); // Adjust the delay duration (in milliseconds) as per your requirement
    });
  }, []);

  const btnStyle =
    "w-full flex justify-center py-2 px-4 border bg-gray-800 text-neutral-200 hover:bg-gray-700";

  if (restart) {
    while (swipes.length !== 0) swipes.pop();
    return <SwipeViewContainer query={null} />;
  }

  if (hotelIDs) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {showMatchOverlay && ( // Render the match overlay conditionally
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
            <h1 className="text-4xl">It&apos;s a match!</h1>{" "}
            {/* Replace ' with &apos; */}
          </div>
        )}
        <h1 className="text-xl font-semibold">
          Your Matches {query ? `With ${query.name}` : ""}
        </h1>
        <div className="flex flex-col gap-4">
          {hotelIDs.map((hotelID, index) => (
            <HotelCard data={hotelData[hotelID]} key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <button className={btnStyle} onClick={() => setShare(true)}>
            Share
          </button>
          <button className={btnStyle} onClick={() => setRestart(true)}>
            Restart
          </button>
        </div>
        {share ? <ShareModal setSelection={setShare} /> : ""}
      </div>
    );
  }

  return <></>;
}
