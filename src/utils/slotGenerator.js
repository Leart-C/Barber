function generateSlots(startHour, endHour, intervalMinutes) {
  const slots = [];
  let current = startHour * 60;

  const end = endHour * 60;

  while (current < end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;

    const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
    slots.push(time);

    current += intervalMinutes;
  }
  return slots;
}

module.exports = generateSlots;
