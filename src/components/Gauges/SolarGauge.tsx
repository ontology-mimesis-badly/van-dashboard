import { useEntity } from "use-homeassistant";
import { Gauge } from "react-circular-gauge";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";

export default function SolarGauge() {
  const data = useEntity("sensor.mppt_panel_power");
  return (
    <>
      <Gauge
        value={data ? Number(data.state) : 0}
        minValue={0}
        maxValue={500}
        startAngle={40}
        endAngle={320}
        arcColor="#fff8"
        trackColor="#fff3"
        trackWidth={0.305}
        arcWidth={0.3}
        color="#fffa"
        fontFamily="SFMono"
        fontWeight={600}
        renderTopLabel="W"
        topLabelStyle={{ fontWeight: 900, fontFamily: "SFCompact" }}
      />
      <SolarPowerRoundedIcon className="text-6xl relative top-[-90px] left-[58px] text-white/60" />
    </>
  );
}
