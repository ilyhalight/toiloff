import {
  GuestbookLocalEntrySchemaArray,
  type GuestbookLocalEntry,
} from "../api/guestbook";

export function getLocalMessages(): GuestbookLocalEntry[] | undefined {
  const localMessages = localStorage.getItem("guestbook-messages");
  if (!localMessages) {
    return;
  }

  try {
    const rawMessageList = JSON.parse(localMessages);
    return GuestbookLocalEntrySchemaArray.parse(rawMessageList);
  } catch (error) {
    console.error("Failed to parse local messages", error);
    return;
  }
}

export function updateLocalMessages(newMessage: GuestbookLocalEntry) {
  const localMessages = getLocalMessages() ?? [];
  localStorage.setItem(
    "guestbook-messages",
    JSON.stringify([newMessage, ...localMessages]),
  );
}
