"use client";

import { memo, useCallback, useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { getArtistDisplayTitle, getArtistProfilePath } from "@/data/artists";
import type { Artist } from "@/data/artists";

export interface TestimonialsColumnProps {
  className?: string;
  artists: Artist[];
  duration?: number;
  locale?: "en" | "he";
  orientation?: "horizontal" | "vertical";
  autoPlay?: boolean;
}

const ArtistShowcaseCard = ({
  artist,
  duplicate,
  locale,
  orientation,
}: {
  artist: Artist;
  duplicate: boolean;
  locale: "en" | "he";
  orientation: "horizontal" | "vertical";
}) => {
  const displayName = locale === "he" && artist.hebrewName ? artist.hebrewName : artist.name;

  return (
    <article
      aria-hidden={duplicate || undefined}
      className={orientation === "horizontal" ? "w-[72vw] max-w-[18rem] shrink-0 snap-start" : undefined}
    >
      <Link
        to={getArtistProfilePath(artist.slug)}
        aria-label={artist.name}
        tabIndex={duplicate ? -1 : undefined}
        className={`group block border border-border bg-card/70 transition-colors hover:border-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px ${orientation === "horizontal" ? "p-3" : "p-4"}`}
      >
        <div className="aspect-[4/5] overflow-hidden bg-secondary/65">
          <img
            src={artist.image}
            alt={artist.name}
            className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${orientation === "horizontal" ? "object-cover" : "object-contain"}`}
          />
        </div>
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="font-display text-xl leading-tight text-foreground">
            <bdi dir="auto">{displayName}</bdi>
          </h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {getArtistDisplayTitle(artist, locale)}
          </p>
        </div>
      </Link>
    </article>
  );
};

export const TestimonialsColumn = memo(
  ({
    className,
    artists,
    duration = 18,
    locale = "en",
    orientation = "vertical",
    autoPlay = true,
  }: TestimonialsColumnProps) => {
    const controls = useAnimationControls();
    const reduceMotion = useReducedMotion();

    const play = useCallback(() => {
      if (reduceMotion || !autoPlay) return;
      const movement = orientation === "horizontal" ? { x: "-50%" } : { y: "-50%" };
      void controls.start({
        ...movement,
        transition: {
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      });
    }, [autoPlay, controls, duration, orientation, reduceMotion]);

    useEffect(() => {
      play();
      return () => controls.stop();
    }, [controls, play]);

    if (artists.length === 0) return null;

    return (
      <div
        className={className}
        data-autoplay={autoPlay}
        data-orientation={orientation}
        onPointerEnter={() => controls.stop()}
        onPointerLeave={play}
        onFocus={() => controls.stop()}
        onBlur={play}
      >
        <motion.div
          animate={reduceMotion || !autoPlay ? undefined : controls}
          className={
            orientation === "horizontal"
              ? "flex w-max bg-background will-change-transform motion-reduce:transform-none"
              : "flex flex-col bg-background will-change-transform motion-reduce:transform-none"
          }
        >
          {(reduceMotion || !autoPlay ? [0] : [0, 1]).map((copyIndex) => (
            <div
              key={copyIndex}
              className={orientation === "horizontal" ? "flex gap-4 pe-4" : "flex flex-col gap-5 pb-5"}
            >
              {artists.map((artist) => (
                <ArtistShowcaseCard
                  key={`${copyIndex}-${artist.slug}`}
                  artist={artist}
                  duplicate={copyIndex > 0}
                  locale={locale}
                  orientation={orientation}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    );
  },
);

TestimonialsColumn.displayName = "TestimonialsColumn";
