import { useTodos } from "./hooks/useTodos"; // 경로 맞게 수정
import { Calendar } from "./components/Calendar"; // 경로 맞게 수정
import { TodoList } from "./components/TodoList";

export default function App() {
  const { todos, selectedDate, setSelectedDate, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="w-full min-h-screen p-10 font-sans">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      
      <div className="flex flex-wrap gap-8">
        <section className="flex-1 min-w-[300px] rounded-lg">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </section>

        <section className="flex-1 min-w-[300px] p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{selectedDate} 할 일 목록</h2>
          <div className="text-gray-500 mt-4">
            <TodoList
            todos={todos}
            selectedDate={selectedDate}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            />
          </div>
        </section>
      </div>
    </div>
  );
}