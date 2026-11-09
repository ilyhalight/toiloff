import type { Snippet } from "svelte";
import type { ComponentConfig } from "./types";

export type DonateItem = {
  platform: string;
  title: string;
  description: string;
  href: string;
  icon: Snippet | ComponentConfig;
  bgIcon?: Snippet | ComponentConfig;
  modal?: Snippet | ComponentConfig;
  modalProps?: Record<string, unknown>;
  modalTitle?: string;
};
