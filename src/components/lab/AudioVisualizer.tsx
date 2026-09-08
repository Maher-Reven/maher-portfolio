"use client";

import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tr } from "@/components/i18n/Tr";

type Status = "idle" | "requesting" | "running" | "denied" | "unsupported";

const BAR_COUNT = 48;
const FFT_SIZE = 256;

/**
 * EXP-005. A real-time frequency-bar visualizer driven by the microphone via
 * the Web Audio API — Canvas2D, not WebGL, so it costs nothing beyond the
 * page unless a visitor opts in. Never requests the mic on its own; audio is
 * analyzed locally and never recorded or sent anywhere.
 */
export function AudioVisualizer() {
  const [status, setStatus] = useState<Status>("idle");
  const [peak, setPeak] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barsRef = useRef(new Float32Array(BAR_COUNT));
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Side-effect-only teardown, safe to run on unmount (no setState there).
  const teardown = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    analyserRef.current = null;
  };

  useEffect(() => teardown, []);

  const stop = () => {
    teardown();
    setStatus("idle");
    setPeak(0);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !analyser || !ctx) return;

    const bins = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(bins);

    const perBar = Math.max(1, Math.floor(bins.length / BAR_COUNT));
    const bars = barsRef.current;
    let peakLevel = 0;

    for (let i = 0; i < BAR_COUNT; i++) {
      let sum = 0;
      for (let j = 0; j < perBar; j++) sum += bins[i * perBar + j] ?? 0;
      const target = sum / perBar / 255;
      // Damped toward the target so a single loud transient doesn't make the
      // bars jitter frame to frame — same idea as the scroll damping in
      // Brain.tsx and SystemsCollapseScene.tsx, just on an audio signal.
      bars[i] += (target - bars[i]) * 0.35;
      peakLevel = Math.max(peakLevel, bars[i]);
    }
    setPeak(Math.round(peakLevel * 100));

    const cs = getComputedStyle(document.documentElement);
    const accent = cs.getPropertyValue("--accent").trim() || "#a855f7";
    const accent2 = cs.getPropertyValue("--accent-2").trim() || "#ec4899";

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    const targetWidth = Math.round(cssWidth * dpr);
    const targetHeight = Math.round(cssHeight * dpr);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    if (cssWidth > 0 && cssHeight > 0) {
      const gap = 2;
      const barWidth = (cssWidth - gap * (BAR_COUNT - 1)) / BAR_COUNT;
      const gradient = ctx.createLinearGradient(0, cssHeight, 0, 0);
      gradient.addColorStop(0, accent);
      gradient.addColorStop(1, accent2);
      ctx.fillStyle = gradient;

      for (let i = 0; i < BAR_COUNT; i++) {
        const h = Math.max(2, bars[i] * cssHeight);
        ctx.fillRect(i * (barWidth + gap), cssHeight - h, barWidth, h);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  };

  const start = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser);
      analyserRef.current = analyser;
      barsRef.current = new Float32Array(BAR_COUNT);

      setStatus("running");
      rafRef.current = requestAnimationFrame(draw);
    } catch {
      teardown();
      setStatus("denied");
    }
  };

  return (
    <div className="my-10 border border-line bg-[var(--bg-panel)] p-8">
      <canvas ref={canvasRef} className="h-40 w-full" aria-hidden />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="label text-fg-dim">
          {status === "idle" && <Tr k="audio.privacy" />}
          {status === "requesting" && <Tr k="audio.requesting" />}
          {status === "denied" && <Tr k="audio.denied" />}
          {status === "unsupported" && <Tr k="audio.unsupported" />}
          {status === "running" && (
            <>
              <Tr k="audio.peak" /> · {peak}%
            </>
          )}
        </p>

        {status === "running" ? (
          <Magnetic>
            <button
              type="button"
              onClick={stop}
              className="bracket mono inline-flex items-center gap-2 border border-line-strong px-4 py-2 text-xs transition-colors hover:border-accent hover:text-accent"
              data-cursor-label="Stop"
            >
              <Tr k="audio.stop" />
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
                <Tr k="audio.enable" />
              </button>
            </Magnetic>
          )
        )}
      </div>
    </div>
  );
}
