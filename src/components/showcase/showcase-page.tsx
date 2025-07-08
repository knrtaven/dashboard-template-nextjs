"use client";

import React, { useMemo } from "react";
import Breadcrumb from "../ui/breadcrumb/Breadcrumb";
import Header from "./showcase-header";
import ShowcaseItem from "./showcase-item";

const ShowcasePage = () => {
  const showcaseItems = useMemo(
    () => [
      {
        id: "1",
        user: {
          name: "James Bobeldyk",
          initials: "JB",
          avatar: undefined,
        },
        date: "7th July 2025",
        content:
          "A big thank you to Kasa, who kindly stepped into the Banksia kitchen tonight to lend a hand! We've recently seen so many of our PCWs go above and beyond to support the team, ensuring our residents continue to enjoy the best possible experience. It's a great reminder that no challenge is too great when we work together!",
        image:
          "https://health-e.in/wp-content/uploads/2023/09/family-shape-figure-with-heart-stethoscope.webp", // Replace with actual image path
        tags: [
          "We Put Residents First",
          "Safety & quality in everything we do",
          "We use our resources wisely",
          "Work Together, Achieve Together",
        ],
        mentionedMembers: ["Kasanita Rasiga"],
        showMyName: true,
        isLiked: false,
      },
      {
        id: "2",
        user: {
          name: "Emily McConaghie",
          initials: "EM",
          avatar: undefined,
        },
        date: "7th July 2025",
        content:
          "Just wanted to say a huge thank you to Jaime who is always going out of her way for our residents. No matter how far behind she is in her day, what she is allocated to do, whether or not she is having a good/bad shift she has this innate ability to know what the residents need/want and automatically follows through on that. She as a fantastic PCW with a heart of gold who we are lucky to have on our team.",
        image: undefined,
        tags: ["To those we serve"],
        mentionedMembers: ["Jaime O'Neill"],
        showMyName: true,
        isLiked: true,
        likeCount: 2,
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        client="Apollo Care Alliance"
        path="Showcase"
        className="bg-[#7f56d9]"
      />
      <Header />

      {/* Main Content */}
      <div className="flex justify-center px-5">
        <div className="flex w-full max-w-[1032px] flex-col gap-6 py-6">
          {showcaseItems.map((item) => (
            <ShowcaseItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;
