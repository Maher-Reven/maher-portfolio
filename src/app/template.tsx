"use client";

import { motion } from "motion/react";
import { easeHud } from "@/lib/motion";

/**
 * Page transition wrapper. Next.js re-mounts template.tsx on every
 * navigation, so each page enters with a HUD-style wipe + fade.
 * Exit animations require a shared-element/FLIP system — planned in
 * the "how it's built" page as phase 2.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-bg"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: easeHud }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeHud, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
