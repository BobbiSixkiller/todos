export function todosCountString(count: number): string {
  if (count === 0) {
    return "0 uloh";
  }
  if (count === 1) {
    return `${count} ulohu`;
  }
  if ([2, 3, 4].includes(count)) {
    return `${count} ulohy`;
  }

  return `${count} uloh`;
}

export function formatDateToISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
