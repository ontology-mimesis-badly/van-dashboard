import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

const getTime = (time: Date) =>
  time
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    })
    .split(" ")[0];

const getDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const Clock = (props: any) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => {
      if (t) clearInterval(t);
    };
  }, [setTime]);

  return (
    <div {...props}>
      <Typography
        variant="h1"
        className="text-white/75 font-sans font-semibold text-[12rem] leading-none"
      >
        {getTime(time)}
      </Typography>
      <Typography
        variant="h2"
        className="text-white/60 font-sans font-semibold leading-none"
      >
        {getDate(time)}
      </Typography>
    </div>
  );
};

export default function Header() {
  return (
    <Container className="flex p-20 w-screen">
      <Clock className="flex-grow" />
    </Container>
  );
}
