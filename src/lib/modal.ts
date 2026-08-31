import { mount, unmount, type Snippet } from "svelte";
import Menu from "../components/Modal/Modal.svelte";
import ImageOverlay from "../components/Utils/ImageOverlay.svelte";

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

export async function showImageOverlay(
  src: string,
  title?: string,
  onDelete?: () => void,
) {
  element = mount(ImageOverlay, {
    target: document.body,
    props: {
      src,
      title,
      onDelete,
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
