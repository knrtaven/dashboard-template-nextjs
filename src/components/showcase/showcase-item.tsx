"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { Heart, Flag } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";

type User = {
  name: string;
  initials: string;
  avatar?: string;
};

interface ShowcaseItemData {
  id: string;
  user: User;
  date: string;
  content: string;
  image?: string;
  tags: string[];
  mentionedMembers: string[];
  showMyName: boolean;
  isLiked: boolean;
  likeCount?: number;
}

interface ShowcaseItemProps {
  data: ShowcaseItemData;
}

const Separator = () => <div className="h-px w-full bg-gray-300"></div>;

const ShowcaseItem: React.FC<ShowcaseItemProps> = ({ data }) => {
  // State management
  const [replyText, setReplyText] = useState("");
  const [showNameToggle, setShowNameToggle] = useState(data.showMyName);
  const [isLiked, setIsLiked] = useState(data.isLiked);

  const handleToggleShowName = useCallback(
    (checked: boolean) => {
      setShowNameToggle(checked);
      console.log("Toggle show name for:", data.id);
    },
    [data.id],
  );

  const handleHideShowcase = useCallback(() => {
    console.log("Hide showcase:", data.id);
  }, [data.id]);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    console.log("Like showcase:", data.id);
  }, [data.id]);

  const handleReply = useCallback(() => {
    const trimmedReply = replyText.trim();
    if (trimmedReply) {
      console.log("Reply to showcase:", data.id, trimmedReply);
      setReplyText("");
    }
  }, [data.id, replyText]);

  const handleReplyTextChange = useCallback((value: string) => {
    setReplyText(value);
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          {/* User Info */}
          <div className="flex flex-grow items-center gap-2">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-lg font-semibold text-green-700">
                  {data.user.initials}
                </span>
              </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-base font-medium text-gray-900">
                  {data.user.name}
                </h3>
                <span className="hidden text-sm font-semibold text-black sm:inline">
                  •
                </span>
                <span className="text-sm text-gray-600">{data.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              label="Show my name"
              defaultChecked={showNameToggle}
              onChange={handleToggleShowName}
              color="#7f56d9"
            />

            <button
              onClick={handleHideShowcase}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              <span className="hidden sm:inline">Hide showcase</span>
              <Flag size={15} />
            </button>
          </div>
        </div>

        <Separator />

        {/* Content Section */}
        <div className="ml-0 flex flex-col gap-3 sm:ml-14">
          {/* Text Content */}
          <p className="text-base leading-relaxed text-gray-700">
            {data.content}
          </p>

          {/* Image */}
          {data.image && (
            <div className="max-w-md">
              <Image
                src={data.image}
                alt="Showcase content"
                width={450}
                height={450}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
          )}

          {data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <Badge key={index} variant="light" color="light" size="md">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Interactions */}
        <div className="-my-2 ml-0 flex flex-col gap-3 sm:ml-14 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 rounded p-2 hover:bg-gray-50"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <div className="h-6 w-6">
              <Heart
                size={23}
                fill={isLiked ? "red" : "none"}
                stroke={isLiked ? "red" : "currentColor"}
                strokeWidth={2}
              />
            </div>
            {data.likeCount && data.likeCount > 0 && (
              <span className="text-sm font-medium text-gray-700">
                + {data.likeCount}
              </span>
            )}
          </button>

          {data.mentionedMembers.length > 0 && (
            <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:gap-2">
              <h6 className="text-sm font-medium text-gray-900">
                Mentioned members:
              </h6>
              <div className="flex flex-wrap gap-2">
                {data.mentionedMembers.map((member, index) => (
                  <Badge key={index} variant="light" color="light" size="md">
                    {member}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Reply Section */}
        <div className="flex items-center gap-5">
          {/* Reply Avatar */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <span className="text-lg font-semibold text-blue-700">JL</span>
          </div>

          <div className="flex-grow">
            <TextArea
              value={replyText}
              onChange={handleReplyTextChange}
              placeholder="Post your reply"
              rows={1}
              className="min-h-[44px]"
              borderless={true}
              maxHeight={150}
            />
          </div>

          {/* Reply Button */}
          <Button
            onClick={handleReply}
            disabled={!replyText.trim()}
            variant={replyText.trim() ? "primary" : "outline"}
            size="sm"
            className={replyText.trim() ? "bg-brand-primary" : ""}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ShowcaseItem);
