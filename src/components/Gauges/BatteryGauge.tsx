import { useEntity } from "use-homeassistant";
import { Gauge } from "react-circular-gauge";
import BatteryIcon from "../../icons/Battery";

export default function BatteryGauge() {
  const data = useEntity("sensor.battery_battery_percentage");
  return (
    <>
      <Gauge
        value={data ? Number(data.state) : 0}
        minValue={0}
        maxValue={100}
        startAngle={40}
        endAngle={320}
        arcColor="#fff8"
        trackColor="#fff3"
        trackWidth={0.305}
        arcWidth={0.3}
        color="#fffa"
        fontFamily="SFMono"
        fontWeight={600}
        renderTopLabel="%"
        topLabelStyle={{ fontWeight: 900, fontFamily: "SFCompact" }}
      />
      <BatteryIcon className="text-6xl relative top-[-90px] left-[58px] text-white/60" />
    </>
  );
}
