export const toFormData = (obj: Record<string, unknown>): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (value == null) {
      continue;
    }

    formData.append(key, value instanceof Blob ? value : String(value));
  }

  return formData;
};

export const dateFormatter = Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  day: "2-digit",
  month: "long",
  year: "numeric",
});
