import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { TodoDto } from "../interfaces/TodoDto";

interface TodosContextProps {
  todos: TodoDto[];
  setTodos: React.Dispatch<React.SetStateAction<TodoDto[]>>;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

export const TodosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<TodoDto[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext should be used within TodosProvider");
  }
  return context;
};
