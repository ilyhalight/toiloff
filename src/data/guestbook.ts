export type GuestbookMessage = {
  username: string;
  content: string;
  href?: string;
  hrefText?: string;
  avatarUrl?: string;
  replyText?: string;
  createdAt: string;
  approvedAt: string;
};

export const guestbookMessages: GuestbookMessage[] = [
  {
    username: "Рандомный пользователь",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    avatarUrl:
      "https://avatars.mds.yandex.net/get-yapic/28053/j1duaPzJgWRpMrtUhuf8hHUKhQ-1/islands-retina-middle",
    href: "ya.ru",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
    replyText: "how sad :(",
  },
  {
    username: "Anonymous",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    href: "https://t.me/test",
    hrefText: "i hate tg",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Anonymous :3",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    avatarUrl:
      "https://avatars.mds.yandex.net/get-yapic/28053/j1duaPzJgWRpMrtUhuf8hHUKhQ-1/islands-retina-middle",
    href: "https://x.com/test",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Anonymous :3",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    href: "https://vk.com/test",
    avatarUrl:
      "https://avatars.mds.yandex.net/get-yapic/28053/j1duaPzJgWRpMrtUhuf8hHUKhQ-1/islands-retina-middle",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Рандомный пользователь",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    href: "https://twitch.tv/test",
    hrefText: "Best streamer -> @test",
    replyText: "i too!!!!",
    avatarUrl:
      "https://avatars.mds.yandex.net/get-yapic/28053/j1duaPzJgWRpMrtUhuf8hHUKhQ-1/islands-retina-middle",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Рандомный пользователь",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    href: "https://github.com/test",
    hrefText: "@test",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Рандомный пользователь",
    content:
      "lorem ipsum is the most better way to test your interfaces with big messages",
    createdAt: "2026-06-28T21:51:34.432Z",
    approvedAt: "2026-06-28T21:51:34.432Z",
  },
  {
    username: "Nika",
    content: "The new cards feel soft but still readable. Waiting for real API messages.",
    href: "https://github.com/nika",
    hrefText: "github.com/nika",
    createdAt: "2026-06-27T18:16:34.432Z",
    approvedAt: "2026-06-27T18:18:34.432Z",
  },
  {
    username: "Frontend passerby",
    content: "Nice dark-first palette. The guestbook needs a tiny moderation badge someday.",
    href: "https://example.com",
    hrefText: "example.com",
    replyText: "noted for the API version",
    createdAt: "2026-06-26T12:08:34.432Z",
    approvedAt: "2026-06-26T12:21:34.432Z",
  },
  {
    username: "Anonymous",
    content: "Leaving a small mark here before the backend arrives.",
    createdAt: "2026-06-25T09:42:34.432Z",
    approvedAt: "2026-06-25T09:52:34.432Z",
  },
];
