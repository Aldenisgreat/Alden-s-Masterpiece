import type { ChapterDef } from "./types";
import HookIntro from "../chapters/01-hook-intro/HookIntro";
import { narrations as hookIntroNarrations } from "../chapters/01-hook-intro/narrations";
import HowEyeWorks from "../chapters/02-how-eye-works/HowEyeWorks";
import { narrations as howEyeWorksNarrations } from "../chapters/02-how-eye-works/narrations";
import StaringTooLong from "../chapters/03-staring-too-long/StaringTooLong";
import { narrations as staringTooLongNarrations } from "../chapters/03-staring-too-long/narrations";
import GhostImage from "../chapters/04-ghost-image/GhostImage";
import { narrations as ghostImageNarrations } from "../chapters/04-ghost-image/narrations";
import EyeFixesItself from "../chapters/05-eye-fixes-itself/EyeFixesItself";
import { narrations as eyeFixesItselfNarrations } from "../chapters/05-eye-fixes-itself/narrations";
import FunExtras from "../chapters/06-fun-extras/FunExtras";
import { narrations as funExtrasNarrations } from "../chapters/06-fun-extras/narrations";
import Outro from "../chapters/07-outro/Outro";
import { narrations as outroNarrations } from "../chapters/07-outro/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "hook-intro",
    title: "Hook / Intro",
    narrations: hookIntroNarrations,
    Component: HookIntro,
  },
  {
    id: "how-eye-works",
    title: "How the Eye Works",
    narrations: howEyeWorksNarrations,
    Component: HowEyeWorks,
  },
  {
    id: "staring-too-long",
    title: "Staring Too Long",
    narrations: staringTooLongNarrations,
    Component: StaringTooLong,
  },
  {
    id: "ghost-image",
    title: "Ghost Image",
    narrations: ghostImageNarrations,
    Component: GhostImage,
  },
  {
    id: "eye-fixes-itself",
    title: "Eye Fixes Itself",
    narrations: eyeFixesItselfNarrations,
    Component: EyeFixesItself,
  },
  {
    id: "fun-extras",
    title: "Fun Extras",
    narrations: funExtrasNarrations,
    Component: FunExtras,
  },
  {
    id: "outro",
    title: "Outro",
    narrations: outroNarrations,
    Component: Outro,
  },
];
