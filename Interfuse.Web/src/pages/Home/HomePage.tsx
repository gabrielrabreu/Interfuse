import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Icon,
  IconButton,
  Typography,
} from "@gabrielrabreu/sage-react";

import { TodosProvider, useTodosContext } from "../../contexts/TodoContext";
import todoService from "../../services/TodoService";
import Section from "../../layout/Section/Section";
import { TodoDto } from "../../interfaces/TodoDto";

import styles from "./HomePage.module.scss";
import AddEditTodoModal from "./AddEditTodoModal/AddEditTodoModal";

const TodosList: React.FC = () => {
  const { todos, setTodos } = useTodosContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<TodoDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todoService.getTodos();
        setTodos(data);
      } catch (error) {
        let errorMessage = error;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast.error(errorMessage as React.ReactNode);
      }
    };
    fetchData();
  }, [setTodos]);

  const handleEdit = (todo: TodoDto): void => {
    setEditingTodo(todo);
    setShowModal(true);
  };

  const handleDelete = async (todo: TodoDto) => {
    try {
      await todoService.deleteTodo(todo.id);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
      toast.success("Todo deleted successfully.");
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage as React.ReactNode);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTodo(null);
  };

  const handleFormSubmit = async (data: TodoDto) => {
    try {
      if (editingTodo) {
        await todoService.updateTodo(editingTodo.id, data);
        const updatedTodo = await todoService.updateTodo(editingTodo.id, data);
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        );
      } else {
        const response = await todoService.createTodo(data);
        setTodos((prevTodos) => [...prevTodos, response]);
      }
      toast.success(
        editingTodo ? "Todo updated successfully" : "Todo added successfully"
      );
      handleModalClose();
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage as React.ReactNode);
    }
  };

  return (
    <div>
      <div className={styles.titleAndButtonContainer}>
        <Typography variant="heading">Todos</Typography>
        <IconButton
          icon={<Icon name="Plus" />}
          onClick={() => setShowModal(true)}
        />
      </div>
      <Section>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <div>
            <table className={styles.todosTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo: TodoDto) => (
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{todo.priority}</td>
                    <td>{todo.is_done ? "Done" : "Pending"}</td>
                    <td>
                      <Button text="Edit" onClick={() => handleEdit(todo)} />
                      <Button
                        text="Delete"
                        onClick={() => handleDelete(todo)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AddEditTodoModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          defaultValue={editingTodo}
        />
      </Section>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <TodosProvider>
        <TodosList />
      </TodosProvider>
    </div>
  );
};

export default HomePage;
