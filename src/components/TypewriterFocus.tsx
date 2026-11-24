import { useEffect, useState } from 'react';

interface TypewriterFocusProps {
  phrases: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

export function TypewriterFocus({
  phrases,
  typingSpeedMs = 46,
  deletingSpeedMs = 26,
  pauseMs = 2200,
}: TypewriterFocusProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(phrases[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const current = phrases[phraseIndex] ?? '';
    let timeoutId: number;

    if (!isDeleting && charCount < current.length) {
      timeoutId = window.setTimeout(() => {
        setCharCount((c) => c + 1);
      }, typingSpeedMs);
    } else if (!isDeleting && charCount === current.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
    } else if (isDeleting && charCount > 0) {
      timeoutId = window.setTimeout(() => {
        setCharCount((c) => c - 1);
      }, deletingSpeedMs);
    } else {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((idx) => (idx + 1) % phrases.length);
      }, 220);
    }

    return () => window.clearTimeout(timeoutId);
  }, [charCount, isDeleting, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, pauseMs]);

  const currentPhrase = phrases[phraseIndex] ?? '';
  const visibleText = currentPhrase.slice(0, charCount);

  return (
    <span className="inline-flex items-center font-semibold text-[#ff7733]">
      <span>{visibleText}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.1em] w-[2px] bg-[#ff5500]"
      />
    </span>
  );
}
