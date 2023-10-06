import AddTodoListDialog from "@/components/AddTodoListDialog";
import Divider from "@/components/Divider";
import TodoLists from "@/components/TodoLists";

export default function TodosHomePage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 flex flex-col sm:flex-row justify-between w-full">
          <div className="mb-5 sm:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todos
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Pre vytvorenie zoznamu klikni pridat.
            </p>
          </div>
          <div>
            <AddTodoListDialog />
          </div>
        </div>
        <Divider />
        <TodoLists />
      </div>
    </div>
  );
}
