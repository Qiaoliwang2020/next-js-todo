import prisma from "@/db";
import Link from "next/link";
import { TodoItem } from "./components/TodoItem";

function getTodos(){
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
     <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link href={'/new'} className=" border border-slate-100 px-4 py-1 rounded">New</Link>
     </header>
     <ul className="pl-4">
     {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            complete={todo.complete}
            toggleTodo={toggleTodo}
          />
        ))}
     </ul>
    </>
  )
}
