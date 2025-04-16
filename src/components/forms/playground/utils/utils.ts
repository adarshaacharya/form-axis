import { format, parseISO, isValid } from "date-fns";

export function formatChatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "Invalid date";
  }
  return format(date, "PPP"); // e.g. "April 29th, 2023"
}
