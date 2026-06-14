import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export interface ExhibitionItem {
  title: string;
  city: string;
  image: string;
  video?: string;
  slug: string;
}

const ExhibitionCard = ({ ex, index }: { ex: ExhibitionItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link to={ex.slug} className="group block">
        <div ref={ref} className="relative overflow-hidden aspect-[4/3]">
          <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0">
            {ex.video ? (
              <video
                src={ex.video}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={ex.image}
                alt={`${ex.title} exhibition`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-deep-charcoal/20 group-hover:bg-deep-charcoal/10 transition-colors" />
        </div>
        <div className="mt-5">
          <h3 className="font-display text-2xl text-foreground">{ex.title}</h3>
          <p className="text-sm text-muted-foreground font-body mt-1">{ex.city}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExhibitionCard;
