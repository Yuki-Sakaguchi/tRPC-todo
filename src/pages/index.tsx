import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState({ title: "", body: "" });
  const hello = trpc.hello.getHello.useQuery({ text: "client" });
  const { data } = trpc.todo.getTodos.useQuery();
  const createTodoMutation = trpc.todo.createTodo.useMutation();
  const deleteTodoMutation = trpc.todo.deleteTodo.useMutation();

  if (!hello.data) {
    return <div>loading...</div>;
  }

  const handleCreateTodo = async () => {
    try {
      if (todo.title && todo.body) {
        await createTodoMutation.mutateAsync(todo);
        setTodo({
          title: "",
          body: "",
        });
        alert("新規登録しました");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoMutation.mutateAsync({ id });
      alert("削除しました");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div>
        <h1 className="text-xl font-bold">{hello.data.greeting}</h1>
        <ul className="mt-4">
          {data &&
            data.map((todo) => (
              <li
                className="flex border mt-2 w-[200px] justify-between"
                key={todo.id}
              >
                <Link className="block px-2 py-3" href={`todo/${todo.id}`}>
                  {todo.title}
                </Link>
                <button
                  className="mr-2"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  削除
                </button>
              </li>
            ))}
        </ul>
        <h2 className="mt-8 text-lg font-bold">新規登録</h2>
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
            onClick={handleCreateTodo}
          >
            登録
          </button>
        </div>
      </div>
    </main>
  );
}
