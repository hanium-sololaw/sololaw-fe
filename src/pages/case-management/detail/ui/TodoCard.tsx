import { useState } from "react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";
import AddIcon from "@/assets/icons/schedule/add-icon.svg?react";
import type { TodoItem } from "../model";

type TodoCardProps = {
  todos: TodoItem[];
  nextDeadline: { dDay: string; date: string };
  onToggle: (id: string) => void;
  onAdd: (title: string, dueDate: string) => Promise<boolean>;
  busy?: boolean;
};

export default function TodoCard({
  todos,
  nextDeadline,
  onToggle,
  onAdd,
  busy = false,
}: TodoCardProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || busy) return;
    if (!(await onAdd(title.trim(), dueDate))) return;
    setTitle("");
    setDueDate("");
  };

  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold text-gray-900">
            지금 해야 할 일
          </h2>
          <p className="text-xs text-gray-400">
            완료하면 최근 변화에 자동으로 남습니다.
          </p>
        </div>

        <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1.5 text-right text-xs font-semibold text-blue-500">
          다음 기한
          <br />
          {nextDeadline.dDay} · {nextDeadline.date}
        </span>
      </div>

      {todos.length === 0 && <p className="text-sm text-gray-400">등록된 할 일이 없습니다.</p>}
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <button
            key={todo.id}
            type="button"
            disabled={busy}
            onClick={() => onToggle(todo.id)}
            className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3.5 py-3 text-left hover:bg-gray-50"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                  todo.done
                    ? "border-blue-400 bg-blue-400"
                    : "border-gray-300 bg-white"
                }`}
              >
                {todo.done && <CheckButtonIcon className="h-3.5 w-3.5" />}
              </span>
              <span
                className={`text-sm font-medium ${
                  todo.done ? "text-gray-400 line-through" : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
            </span>
            <span className="shrink-0 text-xs text-gray-400">
              {todo.dueDate}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleAdd()}
          placeholder="할 일 추가"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="w-36 shrink-0 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400"
        />
        <button
          type="button"
          disabled={busy}
          onClick={handleAdd}
          className="flex shrink-0 items-center gap-1 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-500 hover:bg-blue-100"
        >
          <AddIcon />
          추가
        </button>
      </div>


    </section>
  );
}
