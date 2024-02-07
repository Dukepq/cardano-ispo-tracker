import * as HoverCard from "@radix-ui/react-hover-card";
import { HelpCircle } from "../../../../node_modules/lucide-react";
import styles from "../styles/hoverPopup.module.css";

export default function HelpPopup({
  children,
  width = 25,
  height = 25,
  className,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <HoverCard.Root openDelay={300}>
      <HoverCard.Trigger asChild>
        <HelpCircle
          width={width}
          height={height}
          className={className ? className : ""}
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          <div className={styles.content}>{children}</div>
          <HoverCard.Arrow className={styles.arrow} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
