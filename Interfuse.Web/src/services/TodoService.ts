import ServiceBase from "./ServiceBase";
import { TodoDto } from "../interfaces/TodoDto";

class TodoService extends ServiceBase {
  async getTodos(): Promise<TodoDto[]> {
    const response = await this.get<TodoDto[]>("/Todos");
    return response;
  }

  async createTodo(data: TodoDto): Promise<TodoDto> {
    const response = await this.post<TodoDto, TodoDto>("/Todos", data);
    return response;
  }

  async updateTodo(id: string, data: TodoDto): Promise<TodoDto> {
    const response = await this.put<TodoDto, TodoDto>(`/Todos/${id}`, data);
    return response;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.delete(`/Todos/${id}`);
  }
}

const todoService = new TodoService("http://127.0.0.1:5002");

export default todoService;
