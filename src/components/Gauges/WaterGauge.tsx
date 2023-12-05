import { useEntity } from "use-homeassistant";
import { Gauge } from "react-circular-gauge";
import WaterDropIcon from "../../icons/WaterDrop";

export default function WaterGauge() {
  const data = useEntity("sensor.freshwater_tank_level");
  return (
    <>
      <Gauge
        value={data ? Number(data.state) : 0}
        minValue={0}
        maxValue={120}
        startAngle={40}
        endAngle={320}
        arcColor="#fff8"
        trackColor="#fff3"
        trackWidth={0.305}
        arcWidth={0.3}
        color="#fffa"
        fontFamily="SFMono"
        fontWeight={600}
        renderTopLabel="L"
        topLabelStyle={{ fontWeight: 900, fontFamily: "SFCompact" }}
      />
      <WaterDropIcon className="text-6xl relative top-[-90px] left-[58px] text-white/60" />
    </>
  );
}
