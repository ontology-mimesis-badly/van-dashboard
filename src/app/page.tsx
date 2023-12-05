"use client";
import Gradient from "@/components/Gradient/Gradient";
import { HomeassistantProvider } from "use-homeassistant";
import { url, token, config } from "../../.env.local";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "@/components/Header";
import EntityGauge from "@/components/Gauges/EntityGauge";
import BatteryIcon from "@/icons/Battery";
import BatteryChargeIcon from "@/icons/BatteryCharge";
import WaterDropIcon from "@/icons/WaterDrop";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import NowPlaying from "@/components/NowPlaying/NowPlaying";
import { useState } from "react";

const iconMap: { [key: string]: React.ElementType } = {
  battery: BatteryIcon,
  water: WaterDropIcon,
  solar: SolarPowerRoundedIcon,
  battery_charge: BatteryChargeIcon,
};

export default function Home() {
  const [colors, setColors] = useState(config.default_colors);
  return (
    <HomeassistantProvider homeassistantUrl={url} accessToken={token}>
      <Gradient colors={colors} />
      <div className="absolute w-screen h-screen overflow-hidden">
        <Header />
        <Container maxWidth="md">
          <Grid container spacing={6}>
            {config.gauges.map(({ icon, ...gauge }) => (
              <Grid xs={3} item>
                <EntityGauge Icon={iconMap[icon]} {...gauge} />
              </Grid>
            ))}
            {config.media_players.map((entity) => (
              <Grid xs={12} item>
                <NowPlaying setColors={setColors} entity={entity} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </HomeassistantProvider>
  );
}
