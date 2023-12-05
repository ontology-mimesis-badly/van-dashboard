import {
  THomeassistantEntity,
  useCallService,
  useEntity,
} from "use-homeassistant";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { extractColors } from "extract-colors";
import {
  Box,
  IconButton,
  LinearProgress,
  Slider,
  Typography,
} from "@mui/material";
import PauseIcon from "@/icons/Pause";
import PlayIcon from "@/icons/Play";
import PreviousIcon from "@/icons/Previous";
import NextIcon from "@/icons/Next";
import SpeakerIcon from "@/icons/Speaker";
import VolumeMuteIcon from "@/icons/VolumeMute";
import VolumeLowIcon from "@/icons/VolumeLow";
import VolumeMidIcon from "@/icons/VolumeMid";
import VolumeHighIcon from "@/icons/VolumeHigh";

export type NowPlayingProps = {
  setColors: (colors: number[]) => void;
  entity: string;
};

function getVolumeIcon(
  data?: THomeassistantEntity<Record<string, any>, string>
): React.ElementType {
  if (!data || data.attributes.is_volume_muted) return VolumeMuteIcon;
  const vol = data.attributes.volume_level;
  if (vol < 1 / 3) return VolumeLowIcon;
  if (vol < 2 / 3) return VolumeMidIcon;
  return VolumeHighIcon;
}

export default function NowPlaying({ setColors, entity }: NowPlayingProps) {
  const data = useEntity(entity);
  const callService = useCallService();
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volumeSliderOffset, setVolumeSliderOffset] = useState("96px");
  const [volume, setVolume] = useState(data?.attributes.volume_level || 0);
  const VolumeIcon = getVolumeIcon(data);

  useEffect(() => {
    const int = setInterval(() => {
      if (data && data.state === "playing") {
        const timeElapsed =
          (new Date().valueOf() -
            new Date(data.attributes.media_position_updated_at).valueOf()) /
          1000;
        const newProg =
          ((data.attributes.media_position + timeElapsed) /
            data.attributes.media_duration) *
          100;
        setProgress(newProg % 100);
      }
    }, 100);
    return () => clearInterval(int);
  }, [data, setProgress]);

  useEffect(() => {
    data && setVolume(data.attributes.volume_level * 100);
  }, [data?.attributes.volume_level, setVolume]);

  useEffect(() => {
    console.log(data?.state);
  }, [data?.state]);

  const changeVolume = useCallback(
    (level: number) => {
      setVolume(level);
      callService("media_player", "volume_set", {
        entity_id: entity,
        volume_level: level / 100,
      });
    },
    [setVolume, callService, entity]
  );

  const showVolumeSlider = useCallback(() => {
    const sliderOffset = Math.round(2.56 * volume - 32);
    setVolumeSliderOffset(`${sliderOffset}px`);
    setShowVolume(true);
  }, [volume, setVolumeSliderOffset, setShowVolume]);

  return (
    <Box className="flex gap-10 min-w-full items-center relative">
      <Paper
        elevation={6}
        className="rounded-[1rem] flex-shrink min-w-[256px] max-h-[256px]"
      >
        <Image
          src={data?.attributes.entity_picture || ""}
          onLoad={(e) =>
            extractColors(e.currentTarget, {
              colorValidator: (r, g, b) => r + g + b < 512,
            }).then((colors) => {
              colors.length > 1 &&
                setColors(colors.map(({ hex }) => Number(`0x${hex.slice(1)}`)));
            })
          }
          alt="album art"
          width={256}
          height={256}
          className="rounded-[1rem]"
        />
      </Paper>
      <Box className="flex-grow w-[548px]">
        <Typography
          variant="h3"
          className="font-sans font-semibold text-white/75 truncate"
        >
          {data?.attributes.media_title}
        </Typography>
        <Typography
          variant="h4"
          className="font-sans font-semibold text-white/60 truncate"
        >
          {data?.attributes.media_artist}
        </Typography>
        <Typography
          variant="h4"
          className="font-sans font-semibold text-white/60 truncate"
        >
          {data?.attributes.media_album_name}
        </Typography>
        <LinearProgress
          variant="determinate"
          classes={{
            root: "h-3 mt-4 rounded-full",
            bar: "bg-white/60 rounded-full",
            colorPrimary: "bg-white/40",
          }}
          value={progress}
        />
        <Box className="flex items-center justify-around pt-4">
          <IconButton size="large">
            <SpeakerIcon className="text-white/80 text-5xl" />
          </IconButton>
          <IconButton
            onClick={() =>
              callService("media_player", "media_previous_track", {
                entity_id: entity,
              })
            }
            size="large"
          >
            <PreviousIcon className="text-white/80 text-6xl" />
          </IconButton>
          <IconButton
            onClick={() =>
              callService("media_player", "media_play_pause", {
                entity_id: entity,
              })
            }
            size="large"
          >
            {data?.state === "playing" ? (
              <PauseIcon className="text-white/80 text-6xl" />
            ) : (
              <PlayIcon className="text-white/80 text-6xl" />
            )}
          </IconButton>
          <IconButton
            onClick={() =>
              callService("media_player", "media_next_track", {
                entity_id: entity,
              })
            }
            size="large"
          >
            <NextIcon className="text-white/80 text-6xl" />
          </IconButton>
          <IconButton size="large" onClick={showVolumeSlider}>
            <VolumeIcon className="text-white/80 text-5xl" />
          </IconButton>
        </Box>
      </Box>
      {showVolume && (
        <Slider
          className={`absolute -right-2 h-[256px] backdrop-blur-2xl`}
          style={{ top: volumeSliderOffset }}
          classes={{
            root: "w-28 rounded-[2rem] p-0 shadow-2xl",
            rail: "bg-white/50",
            track: "bg-white/60 rounded-t-none border-none",
            thumb: "hidden",
          }}
          orientation="vertical"
          value={volume}
          onChange={(_, value) => changeVolume(Number(value))}
          onChangeCommitted={() => setShowVolume(false)}
        />
      )}
    </Box>
  );
}
