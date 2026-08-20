import { mount, unmount, type Snippet } from "svelte";
import Menu from "../components/Modal/Modal.svelte";

let element: ReturnType<typeof mount> | undefined = undefined;

export async function showModal(children: Snippet, title?: string) {
  element = mount(Menu, {
    target: document.body,
    props: {
      children,
      title,
    },
  });
}

export async function closeModal() {
  if (!element) {
    return;
  }

  await unmount(element);
  element = undefined;
}
