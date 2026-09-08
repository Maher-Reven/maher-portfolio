"use client";

import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tr } from "@/components/i18n/Tr";

type Status = "idle" | "requesting" | "running" | "denied" | "unsupported";

const COLS = 100;
const DEFAULT_ROWS = 56;
// Monospace glyphs are taller than they are wide, so sampling one row per
// pixel-square would stretch the image vertically — this compensates.
const CHAR_ASPECT = 0.55;
// The site's own block-shading glyphs (see GLYPHS in TextScramble.tsx),
// ordered sparse -> dense so they read as a luminance ramp.
const RAMP = " ░▒▓█";
const FRAME_INTERVAL_MS = 1000 / 15;

/**
 * EXP-006. A live camera feed reduced to brightness and redrawn as the site's
 * own block-shading glyphs in a monospace <pre> — video processed entirely
 * client-side, never recorded or sent anywhere. Structured to match
 * AudioVisualizer.tsx: same consent-gated state machine, same unconditional
 * teardown on unmount, same "stop" control.
 */
export function AsciiWebcam() {
  const [status, setStatus] = useState<Status>("idle");

  const preRef = useRef<HTMLPreElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sampleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rowsRef = useRef(DEFAULT_ROWS);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);

  // Side-effect-only teardown, safe to run on unmount (no setState there).
  const teardown = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    videoRef.current?.pause();
    videoRef.current = null;
    sampleCanvasRef.current = null;
  };

  useEffect(() => teardown, []);

  const stop = () => {
    teardown();
    setStatus("idle");
    if (preRef.current) preRef.current.textContent = "";
  };

  const draw = (time: number) => {
    const video = videoRef.current;
    const sample = sampleCanvasRef.current;
    const pre = preRef.current;
    if (!video || !sample || !pre) return;

    if (time - lastFrameRef.current < FRAME_INTERVAL_MS) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameRef.current = time;

    const rows = rowsRef.current;
    const ctx = sample.getContext("2d", { willReadFrequently: true });
    if (!ctx || video.videoWidth === 0) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    // Mirror the draw (selfie-style) directly at the target grid resolution —
    // the browser's own image scaling does the downsampling/averaging.
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -COLS, 0, COLS, rows);
    ctx.restore();

    const { data } = ctx.getImageData(0, 0, COLS, rows);
    let out = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < COLS; x++) {
        const i = (y * COLS + x) * 4;
        const luminance = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        const level = Math.min(RAMP.length - 1, Math.floor(luminance * RAMP.length));
        out += RAMP[level];
      }
      out += "\n";
    }
    pre.textContent = out;

    rafRef.current = requestAnimationFrame(draw);
  };

  const start = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;

      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        if (video.videoWidth > 0) {
          rowsRef.current = Math.round(COLS * (video.videoHeight / video.videoWidth) * CHAR_ASPECT);
        }
      };
      await video.play();
      videoRef.current = video;

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = COLS;
      sampleCanvas.height = 200; // generous fixed height; drawImage rescales per-frame to rowsRef
      sampleCanvasRef.current = sampleCanvas;

      setStatus("running");
      rafRef.current = requestAnimationFrame(draw);
    } catch {
      teardown();
      setStatus("denied");
    }
  };

  return (
    <div className="my-10 border border-line bg-[var(--bg-panel)] p-8">
      <div className="flex min-h-[200px] items-center justify-center overflow-hidden">
        <pre
          ref={preRef}
          aria-hidden
          className="mono select-none text-accent"
          style={{ lineHeight: 1, letterSpacing: 0, fontSize: "clamp(3px, 0.9vw, 7px)", whiteSpace: "pre" }}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="label text-fg-dim">
          {status === "idle" && <Tr k="camera.privacy" />}
          {status === "requesting" && <Tr k="camera.requesting" />}
          {status === "denied" && <Tr k="camera.denied" />}
          {status === "unsupported" && <Tr k="camera.unsupported" />}
          {status === "running" && <Tr k="camera.privacy" />}
        </p>

        {status === "running" ? (
          <Magnetic>
            <button
              type="button"
              onClick={stop}
              className="bracket mono inline-flex items-center gap-2 border border-line-strong px-4 py-2 text-xs transition-colors hover:border-accent hover:text-accent"
              data-cursor-label="Stop"
            >
              <Tr k="camera.stop" />
            </button>
          </Magnetic>
        ) : (
          status !== "unsupported" && (
            <Magnetic>
              <button
                type="button"
                onClick={start}
                disabled={status === "requesting"}
                className="bracket mono inline-flex items-center gap-2 border border-line-strong px-4 py-2 text-xs transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                data-cursor-label="Enable"
              >
                <Tr k="camera.enable" />
              </button>
            </Magnetic>
          )
        )}
      </div>
    </div>
  );
}
