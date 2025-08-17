export function getBadge(lead) {
  const today = new Date();
  if (!lead.nextFollowUp) return null;

  const nextFollowUp = new Date(lead.nextFollowUp);
  const isSameDay = nextFollowUp.toDateString() === today.toDateString();

  if (isSameDay) return "Today";
  if (nextFollowUp < today && !["Won", "Lost"].includes(lead.status)) {
    return "Overdue";
  }
  return null;
}
