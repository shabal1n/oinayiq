"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FaFutbol, FaBasketballBall, FaBaseballBall } from "react-icons/fa";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const sports = [
  {
    label: "Football",
    icon: FaFutbol,
    description:
      "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.",
  },
  {
    label: "Basketball",
    icon: FaBasketballBall,
    description:
      "Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.",
  },
  {
    label: "Baseball",
    icon: FaBaseballBall,
    description:
      "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding.",
  },
  {
    label: "Tennis",
    icon: FaBaseballBall,
    description:
      "Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each.",
  },
  {
    label: "Golf",
    icon: FaBaseballBall,
    description:
      "Golf is a club-and-ball sport in which players use various clubs to hit balls into a series of holes on a course in as few strokes as possible.",
  },
  {
    label: "Cricket",
    icon: FaBaseballBall,
    description:
      "Cricket is a bat-and-ball game played between two teams of eleven players on a field at the center of which is a 22-yard pitch with a wicket at each end.",
  },
  {
    label: "Rugby",
    icon: FaBaseballBall,
    description:
      "Rugby is a collective name for the team sports of rugby league and rugby union, as well as the earlier forms of football from which both games, as well as Australian rules football and gridiron football, evolved.",
  },
  {
    label: "Hockey",
    icon: FaBaseballBall,
    description:
      "Hockey is a sport in which two teams play against each other by trying to manoeuvre a ball or a puck into the opponent's goal using a hockey stick.",
  },
  {
    label: "Volleyball",
    icon: FaBaseballBall,
    description:
      "Volleyball is a team sport in which two teams of six players are separated by a net.",
  },
  {
    label: "Table Tennis",
    icon: FaBaseballBall,
    description:
      "Table tennis, also known as ping-pong and whiff-whaff, is a sport in which two or four players hit a lightweight ball, also known as the ping-pong ball, back and forth across a table using small solid rackets.",
  },
  {
    label: "Badminton",
    icon: FaBaseballBall,
    description:
      "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
  },
];

const Sports = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {sports.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Sports;
