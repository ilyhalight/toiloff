import { createRawSnippet, mount, unmount } from "svelte";
import TimedMessage from "../components/TimedMessage.svelte";

let element: ReturnType<typeof mount> | undefined = undefined;
let timer: ReturnType<typeof setTimeout> | undefined = undefined;

export async function tmAlert(content: any, duration: number = 3000) {
  await tmClose(false);

  element = mount(TimedMessage, {
    target: document.body,
    props: {
      children: createRawSnippet(() => {
        return {
          render: () => content,
        };
      }),
    },
  });

  timer = setTimeout(async () => {
    await tmClose();
  }, duration);
}

export async function tmClose(outro = true) {
  if (!element) {
    return;
  }

  await unmount(element, {
    outro,
  });
  element = undefined;
  clearTimeout(timer);
}
