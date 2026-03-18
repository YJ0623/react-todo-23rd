import { useState } from 'react';
import type { TodoData } from '../../types/todo';

interface TodoListProps {
  todos: TodoData;
  selectedDate: string;
  addTodo: (date: string, text: string) => void;
  toggleTodo: (date: string, id: string) => void;
  deleteTodo: (date: string, id: string) => void;
}

// 할일: 완료하면 완료 애니메이션 보여주기
export const TodoList = ({
  todos,
  selectedDate,
  addTodo,
  toggleTodo,
  deleteTodo,
}: TodoListProps) => {
  const [userInput, setUserInput] = useState('');

  const currentTodos = todos[selectedDate] || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    addTodo(selectedDate, userInput);
    setUserInput('');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 h-[40px]">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="flex w-full border p-2 rounded"
          placeholder="새로운 할 일을 입력하세요"
        />
        <button
          onClick={handleSubmit}
          className="bg-midBlue w-[100px] text-white px-4 py-2 rounded cursor-pointer"
        >
          추가
        </button>
      </div>

      <ul className="flex flex-col gap-2 mt-4">
        {currentTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className={`${todo.isCompleted === true ? 'text-gray-400 font-semibold line-through' : 'text-black font-semibold'}`}>{todo.title}</span>
            <div className="flex gap-2 h-10">
              {!todo.isCompleted && (
                <button
                  onClick={() => toggleTodo(selectedDate, todo.id)}
                  className="w-[80px] border bg-deepBlue text-white rounded-lg cursor-pointer"
                >
                  완료
                </button>
              )}
              <button onClick={() => deleteTodo(selectedDate, todo.id)} className='w-[80px] bg-white border rounded-lg cursor-pointer'>
                삭제
              </button>
            </div>
          </li>
        ))}

        {currentTodos.length === 0 && (
          <p className="text-gray-500">이 날짜엔 아직 할 일이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};
