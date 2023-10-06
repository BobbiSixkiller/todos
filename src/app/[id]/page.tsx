import AddTodoDialog from "@/components/AddTodoDialog";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Todos from "@/components/Todos";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import ListInfo from "@/components/ListInfo";
import { TodosProvider } from "../providers/TodosProvider";
import Filter from "@/components/Filter";

export default function TodoListPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <TodosProvider>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto lg:mx-0 flex flex-col sm:flex-row justify-between w-full">
            <ListInfo id={id} />
            <div className="mt-3 sm:mt-0">
              <Link href={"/"}>
                <Button className="mr-2">
                  <ChevronLeftIcon className="h-6 w-6" />
                  Spat
                </Button>
              </Link>
              <AddTodoDialog />
            </div>
          </div>
          <Divider />
          <Filter />
          <Todos />
        </div>
      </div>
    </TodosProvider>
  );
}
