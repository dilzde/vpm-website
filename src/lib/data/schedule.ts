export interface ScheduleItem {
  id: string;
  days: number[]; // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  dayName: string;
  startTime: string; // "HH:MM" 24h
  endTime: string;   // "HH:MM" 24h
  title: string;
  description: string;
  platform: string;
}

export const RECURRING_SCHEDULE: ScheduleItem[] = [
  {
    id: "prophetic-teaching-tue-fri",
    days: [2, 3, 4, 5], // Tue, Wed, Thu, Fri
    dayName: "Tuesday – Friday",
    startTime: "20:00",
    endTime: "22:00",
    title: "Prophetic Teaching Hour",
    description: "Live prophetic teaching & revelation",
    platform: "YouTube (Asriel TV) & asrielradio.com",
  },
  {
    id: "prophetic-checking-wed",
    days: [3], // Wednesday
    dayName: "Wednesday",
    startTime: "11:00",
    endTime: "15:00",
    title: "Prophetic Checking",
    description: "Personal prophetic guidance & prayer consultation",
    platform: "Kisumu HQ & Nairobi Sanctuary",
  },
  {
    id: "deliverance-fri",
    days: [5], // Friday
    dayName: "Friday",
    startTime: "16:00",
    endTime: "18:00",
    title: "Deliverance Service",
    description: "Intercessory warfare & deliverance prayer",
    platform: "Sanctuary Altars",
  },
  {
    id: "worship-interactive-sun",
    days: [0], // Sunday
    dayName: "Sunday",
    startTime: "05:30",
    endTime: "08:00",
    title: "Worship & Interactive Session",
    description: "Morning worship with Prophet Dr. Samo Mtishiby",
    platform: "Asriel Radio Live",
  },
  {
    id: "official-service-sun",
    days: [0], // Sunday
    dayName: "Sunday",
    startTime: "08:30",
    endTime: "16:00",
    title: "Official Sunday Service",
    description: "Main weekly celebration, prophetic word & worship",
    platform: "All Branch Sanctuaries & Live Stream",
  },
];

export interface CurrentOrNextService {
  isHappeningNow: boolean;
  service: ScheduleItem;
  displayTime: string;
}

export function getCurrentOrNextService(): CurrentOrNextService {
  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // 1. Check if currently happening now
  for (const item of RECURRING_SCHEDULE) {
    if (item.days.includes(currentDay)) {
      const [startH, startM] = item.startTime.split(":").map(Number);
      const [endH, endM] = item.endTime.split(":").map(Number);
      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      if (currentMinutes >= startTotal && currentMinutes < endTotal) {
        return {
          isHappeningNow: true,
          service: item,
          displayTime: `Happening Now (${formatTime12(item.startTime)} – ${formatTime12(item.endTime)})`,
        };
      }
    }
  }

  // 2. Find next upcoming service
  // Check today later, or future days in the next 7 days
  for (let offset = 0; offset < 7; offset++) {
    const targetDay = (currentDay + offset) % 7;
    for (const item of RECURRING_SCHEDULE) {
      if (item.days.includes(targetDay)) {
        const [startH, startM] = item.startTime.split(":").map(Number);
        const startTotal = startH * 60 + startM;

        if (offset > 0 || startTotal > currentMinutes) {
          const dayLabel =
            offset === 0
              ? "Today"
              : offset === 1
              ? "Tomorrow"
              : getDayName(targetDay);
          return {
            isHappeningNow: false,
            service: item,
            displayTime: `${dayLabel} at ${formatTime12(item.startTime)}`,
          };
        }
      }
    }
  }

  // Fallback to first schedule item
  return {
    isHappeningNow: false,
    service: RECURRING_SCHEDULE[0],
    displayTime: "Tuesday at 8:00 PM",
  };
}

function formatTime12(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const mStr = m === 0 ? "" : `:${m < 10 ? "0" : ""}${m}`;
  return `${h12}${mStr} ${period}`;
}

function getDayName(day: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}
