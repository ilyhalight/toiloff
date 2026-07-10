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
