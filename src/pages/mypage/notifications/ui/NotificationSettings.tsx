import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import { notificationSettings } from "../data/mockNotifications";
import {
  getNotificationSettings,
  updateNotificationSettings,
  type NotificationSettingKey,
  type NotificationSettingsResponse,
} from "../api/notificationSettings";

const manualCheckItems = [
  "상대방이 답변서·준비서면을 냈는지",
  "법원이 기일을 새로 잡거나 바꿨는지",
  "사건 진행 상태가 바뀌었는지",
  "내 사건과 비슷한 판례가 새로 나왔는지",
];

type ToggleProps = {
  enabled: boolean;
  disabled?: boolean;
  onChange: () => void;
};

function Toggle({ enabled, disabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onChange}
      className={`flex h-6.5 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
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
  const [values, setValues] = useState<NotificationSettingsResponse | null>(
    null,
  );
  const [loadError, setLoadError] = useState(false);
  const [savingKey, setSavingKey] = useState<NotificationSettingKey | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    getNotificationSettings()
      .then((result) => {
        if (!cancelled) setValues(result);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSetting = async (key: NotificationSettingKey) => {
    if (!values || savingKey) return;

    const previous = values;
    const nextValue = !values[key];
    setValues({ ...values, [key]: nextValue });
    setSavingKey(key);

    try {
      setValues(await updateNotificationSettings({ [key]: nextValue }));
    } catch {
      setValues(previous);
      window.alert("알림 설정을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="flex w-full shrink-0 flex-col gap-5 lg:w-80">
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">알림 설정</h2>

        {loadError && (
          <p className="mb-3 text-sm text-red-500">
            알림 설정을 불러오지 못했어요.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {notificationSettings.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-gray-800">
                  {item.title}
                </span>
                <span className="text-xs text-gray-500">
                  {item.description}
                </span>
              </div>
              <Toggle
                enabled={values?.[item.key] ?? false}
                disabled={!values || savingKey !== null}
                onChange={() => toggleSetting(item.key)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 px-1">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
          <AboutIcon className="shrink-0" />
          유의사항
        </h3>
        <p className="text-xs text-gray-400">
          다음은 알림으로 오지 않으니 직접 확인하셔야 합니다.
        </p>
        <ul className="flex flex-col gap-1.5">
          {manualCheckItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs text-gray-600"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-gray-400">
          법원에서 통지서를 받으셨다면{" "}
          <Link
            to="/schedule?upload=court-notice"
            className="text-blue-400 underline underline-offset-2"
          >
            일정 관리 → 법원 통지서 등록
          </Link>
          에서 올려 주세요. 기일과 기한을 계산해 알림으로 만들어 드립니다.
        </p>
      </section>
    </div>
  );
}
