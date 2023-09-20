import config from '~/config/config.js';

export default function getTitle (title) {
  return `${title} ${config.titleSeparator} ${config.siteName}`;
}