import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}

const SectionHeading = ({ label, title, description, children, align = "left", light = false }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <span className={`text-xs uppercase tracking-[0.25em] font-body block mb-3 ${light ? "text-warm-cream/50" : "text-muted-foreground"}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight ${light ? "text-warm-cream" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg font-body font-light leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-warm-cream/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
};

export default SectionHeading;
