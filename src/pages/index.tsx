import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function Home() {
  const hello = trpc.hello.getHello.useQuery({ text: "client" });
  const { data } = trpc.todo.getTodos.useQuery();

  if (!hello.data) {
    return <div>loading...</div>;
  }

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div>
        <h1>{hello.data.greeting}</h1>
        <ul className="mt-8">
          {data &&
            data.map((todo) => (
              <li key={todo.id}>
                <Link
                  className="block px-2 py-3 border mt-2"
                  href={`todo/${todo.id}`}
                >
                  {todo.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
