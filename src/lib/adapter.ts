import {
  createRawSnippet,
  mount,
  unmount,
  type Component,
  type Snippet,
} from "svelte";

export function componentToSnippet(component: Component, props = {}): Snippet {
  return createRawSnippet(() => ({
    render: () => `<span style="display: contents"></span>`,

    setup(node) {
      const instance = mount(component, {
        target: node,
        props,
      });

      return () => unmount(instance);
    },
  }));
}
