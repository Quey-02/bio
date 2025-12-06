import styles from "./GenreSelector.module.scss";
import clsx from "clsx";
import type { GenreMap } from "@/types/novel_chat";
import { Button } from "@radix-ui/themes";

interface GenreSelectorProps {
  genres: GenreMap;
  onSelect: (genreName: string) => void;
  disabled?: boolean;
}

export default function GenreSelector({
  genres,
  onSelect,
  disabled = false,
}: GenreSelectorProps) {
  return (
    <div className={clsx(styles["genre-selector"])}>
      <div className={clsx(styles["genre-buttons"])}>
        {Object.entries(genres).map(([key, name]) => (
          <Button
            key={key}
            variant="soft"
            size="2"
            onClick={() => onSelect(name)}
            disabled={disabled}
            className={clsx(styles["genre-button"])}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
