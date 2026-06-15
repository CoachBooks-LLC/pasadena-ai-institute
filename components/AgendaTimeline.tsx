import { agenda } from "@/lib/content";

export function AgendaTimeline() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {agenda.map((day) => (
        <div key={day.day} className="card">
          <div className="flex items-baseline justify-between gap-3 border-b border-ink-100 pb-4">
            <h3 className="text-2xl font-semibold">{day.day}</h3>
            <span className="text-right text-sm font-medium text-amber-700">
              {day.theme}
            </span>
          </div>
          <ol className="mt-5 space-y-5">
            {day.items.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="w-12 shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-ink-400">
                  {item.time}
                </span>
                <span className="relative block border-l border-ink-100 pl-4">
                  <span className="absolute -left-[5px] top-1.5 block h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="block font-semibold text-ink-900">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
