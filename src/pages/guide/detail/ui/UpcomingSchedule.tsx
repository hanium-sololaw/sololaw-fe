import type { ScheduleEvent } from "../data/mockGuideDetail";

type UpcomingScheduleProps = {
  schedules: ScheduleEvent[];
};

export default function UpcomingSchedule({ schedules }: UpcomingScheduleProps) {
  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-6 ">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">예정된 일정</h2>

      <div className="flex flex-col gap-4">
        {schedules.map((event) => (
          <div
            key={event.id}
            className="flex flex-col gap-1 rounded-[10px] border-[0.7px] border-gray-300 px-4 py-3"
          >
            <p className="text-base leading-6 font-medium text-gray-900">
              {event.title}
            </p>
            <p className="text-sm leading-5 font-normal text-gray-500">
              {event.date}
            </p>
            {event.location && (
              <p className="text-sm leading-5 font-normal text-gray-500">
                {event.location}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
