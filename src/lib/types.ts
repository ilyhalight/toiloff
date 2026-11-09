import type { Component } from "svelte";

export type ComponentConfig<T extends Record<string, any> = any> = Component<T>;
