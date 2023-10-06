export interface Todo {
  id: string;
  listId: string;
  name: string;
  desc: string;
  deadline: Date;
  finished: boolean;
}

export interface TodoList {
  id: string;
  name: string;
}
