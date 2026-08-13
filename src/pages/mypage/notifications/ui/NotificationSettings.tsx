import { useState } from "react";
import { notificationSettings } from "../data/mockNotifications";

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
};

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`flex h-6.5 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
        enabled ? "bg-blue-300" : "bg-gray-200"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState(notificationSettings);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <section className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white p-5 lg:w-80">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">알림 설정</h2>

      <div className="flex flex-col gap-4">
        {settings.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-800">
                {item.title}
              </span>
              <span className="text-xs text-gray-500">{item.description}</span>
            </div>
            <Toggle
              enabled={item.enabled}
              onChange={() => toggleSetting(item.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
