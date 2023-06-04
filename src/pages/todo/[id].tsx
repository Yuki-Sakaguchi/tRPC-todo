import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function Todo() {
  const router = useRouter();
  const id = Number(router.query.id);
  const [todo, setTodo] = useState({ title: "", body: "" });
  const updateMutation = trpc.todo.updateTodo.useMutation();

  const { data } = trpc.todo.getTodoById.useQuery({
    id,
  });

  if (!data) {
    return;
  }

  const handleUpdateTodo = async () => {
    try {
      if (todo.title && todo.body) {
        await updateMutation.mutateAsync({ ...todo, id });
        setTodo({
          title: "",
          body: "",
        });
        alert("更新しました");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div>
        <h1 className="text-xl font-bold">{data.title}</h1>
        <p>body: {data.body}</p>
        <h2 className="mt-8 text-lg font-bold">更新</h2>
        <div>
          <label className="block text-sm">タイトル</label>
          <input
            className="border w-full"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodo({ ...todo, title: e.target.value })
            }
            value={todo.title}
          />
        </div>
        <div>
          <label className="block text-sm mt-2">本文</label>
          <input
            className="border w-full"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodo({ ...todo, body: e.target.value })
            }
            value={todo.body}
          />
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="px-8 py-1 bg-blue-800 text-white rounded-full"
            onClick={handleUpdateTodo}
          >
            更新
          </button>
        </div>
      </div>
    </main>
  );
}
