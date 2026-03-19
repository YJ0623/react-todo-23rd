import { useTodos } from './hooks/useTodos'; // 경로 맞게 수정
import { Calendar } from './components/Calendar'; // 경로 맞게 수정
import { TodoList } from './components/TodoList';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const {
    todos,
    selectedDate,
    setSelectedDate,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="w-full min-h-screen p-10 font-sans dark:bg-darkbg dark:text-white">
      <nav className="flex justify-between w-full text-2xl font-bold mb-6">
        <h1>Todo List</h1>

        <button
          onClick={toggleDarkMode}
          className={`w-8 h-8 rounded-[5px] cursor-pointer transition-colors duration-200 
            ${isDarkMode ? 'bg-deepBlue' : 'bg-cream'}
          `}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </nav>

      <div className="flex flex-wrap gap-8">
        <section className="flex-1 min-w-[300px] rounded-lg">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </section>

        <section className="flex-1 min-w-[300px] p-6 rounded-lg border border-px dark:border-none dark:bg-graybg shadow border-gray-200">
          <TodoList
            todos={todos}
            selectedDate={selectedDate}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </section>
      </div>
    </div>
  );
}
