import { agenda } from "@/lib/content";

export function AgendaTimeline() {
  return (
    <div className="grid gap-y-12 lg:grid-cols-[minmax(0,52rem)]">
      {agenda.map((day) => (
        <div key={day.day}>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink-200 pb-4">
            <h3 className="font-serif text-3xl font-normal tracking-tight text-ink-900">
              {day.day}
            </h3>
            <span className="font-serif text-base italic text-accent">
              {day.theme}
            </span>
          </div>
          <ol className="mt-6 space-y-7">
            {day.items.map((item) => (
              <li key={item.title} className="flex gap-5">
                <span className="w-14 shrink-0 pt-0.5 font-sans text-sm tabular-nums text-ink-500">
                  {item.time}
                </span>
                <span className="block border-l border-ink-100 pl-5">
                  <span className="block font-medium text-ink-900">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">
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
