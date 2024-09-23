import {
  FaTrophy,
  FaUserFriends,
  FaShoppingCart,
  FaUsers,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  MdOutlineSportsScore,
  MdVolunteerActivism,
  MdSportsCricket,
} from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";

export const cardData = [
  {
    title: "Upcoming Tournaments",
    icon: <FaTrophy className="mr-2 text-yellow-500" />,
    items: [
      "Autumn T20 Series - October 2024",
      "Regional ODI Series - November 2024",
      "Winter Test Series - December 2024",
      "Community Cricket League - January 2025",
      "District Premier Cup - February 2025",
      "Local Ranji Trophy - March 2025",
    ],
    link: "/tournaments",
    linkText: "View Details/Register",
    linkIcon: <FaRegCalendarAlt className="inline-block mr-2" />,
  },
  {
    title: "Past Tournaments",
    icon: <FaTrophy className="mr-2 text-gray-500" />,
    items: [
      "City T20 Challenge 2023",
      "Local ODI Series 2022",
      "Neighborhood Test Championship 2021",
      "Community T20 Cup 2020",
      "Township ODI Tournament 2019",
      "Village Test Series 2018",
    ],
    link: "/tournaments",
    linkText: "View Details",
    linkIcon: <MdOutlineSportsScore className="inline-block mr-2" />,
  },
  {
    title: "Featured Players",
    icon: <FaUserFriends className="mr-2 text-blue-500" />,
    items: [
      "John Smith - Batsman",
      "Sarah Johnson - All-Rounder",
      "Michael Brown - Bowler",
      "David Lee - Batsman",
      "Emma Wilson - Bowler",
      "James Taylor - All-Rounder",
    ],
    link: "/players",
    linkText: "View Stats",
    linkIcon: <FaUsers className="inline-block mr-2" />,
  },
  {
    title: "Job & Volunteer Opportunities",
    icon: <MdVolunteerActivism className="mr-2 text-orange-500" />,
    items: [
      "Head Coach",
      "Event Coordinator",
      "Match Day Assistant",
      "Junior Coach",
      "Ticket Booth Operator",
    ],
    link: "/jobs",
    linkText: "View Opportunities",
    linkIcon: <FaUserFriends className="inline-block mr-2" />,
  },
  {
    title: "Training & Coaching Programs",
    icon: <GiWhistle className="mr-2 text-red-500" />,
    items: [
      "Junior Cricket Camp",
      "Advanced Batting Techniques",
      "Bowling Masterclass",
      "Wicket-keeping Skills",
      "Fitness Camp",
    ],
    link: "/training",
    linkText: "View Programs",
    linkIcon: <MdSportsCricket className="inline-block mr-2" />,
  },
  {
    title: "Cricket Equipment Shop",
    icon: <FaShoppingCart className="mr-2 text-purple-500" />,
    items: [
      "Cricket Bat",
      "Cricket Ball",
      "Batting Gloves",
      "Helmet & Shoes",
      "Cricket Pads",
    ],
    link: "/shop",
    linkText: "Visit Shop",
    linkIcon: <BiCricketBall className="inline-block mr-2" />,
  },
];
