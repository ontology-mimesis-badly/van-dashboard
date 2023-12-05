import { useEntity } from "use-homeassistant";
import { Gauge, GaugeProps } from "./Gauge";

export type EntityGaugeProps = {
  entity: string;
  Icon: React.ElementType;
} & Required<Pick<GaugeProps, "minValue" | "maxValue">> &
  GaugeProps;

export default function EntityGauge({
  entity,
  Icon,
  ...gaugeProps
}: EntityGaugeProps) {
  const data = useEntity(entity);
  return (
    <>
      <Gauge
        value={data ? Number(data.state) : 0}
        startAngle={40}
        endAngle={320}
        arcColor="#fff8"
        trackColor="#fff3"
        trackWidth={0.205}
        arcWidth={0.2}
        color="#fffa"
        fontFamily="SFMono"
        fontWeight={600}
        renderTopLabel={data?.attributes.unit_of_measurement}
        topLabelStyle={{ fontWeight: 900, fontFamily: "SFCompact" }}
        {...gaugeProps}
      />
      <Icon className="text-6xl relative top-[-85px] left-[58px] text-white/60" />
    </>
  );
}
