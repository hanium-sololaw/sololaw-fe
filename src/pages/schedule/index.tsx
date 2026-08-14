import { useState } from "react";
import ScheduleHeader from "./ui/ScheduleHeader";
import ScheduleNoticeBanner from "./ui/ScheduleNoticeBanner";
import ScheduleCalendar from "./ui/ScheduleCalendar";
import DaySchedulePanel from "./ui/DaySchedulePanel";
import UpcomingSchedules from "./ui/UpcomingSchedules";
import { scheduleEvents } from "./data/mockSchedule";
import { toDateKey } from "./utils";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const selectedDayEvents = scheduleEvents.filter(
    (event) => event.date === toDateKey(selectedDate),
  );

  return (
    <div className="flex flex-col gap-6">
      <ScheduleHeader />
      <ScheduleNoticeBanner />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <ScheduleCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          events={scheduleEvents}
        />

        <div className="flex flex-col gap-6">
          <DaySchedulePanel
            selectedDate={selectedDate}
            events={selectedDayEvents}
          />
          <UpcomingSchedules events={scheduleEvents} />
        </div>
      </div>
    </div>
  );
}
