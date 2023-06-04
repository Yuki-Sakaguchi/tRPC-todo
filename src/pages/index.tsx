import { trpc } from "@/utils/trpc";

export default function Home() {
  const hello = trpc.hello.getHello.useQuery({ text: "client" });
  if (!hello.data) {
    return <div>loading...</div>;
  }
  return (
    <main className="flex justify-center items-center w-full h-full">
      {hello.data.greeting}
    </main>
  );
}
