import { useState } from 'react';
import type { TodoData } from '../../types/todo';
import { getTodayDateString } from '../hooks/useTodos.ts'; // 경로 맞게 수정

interface CalendarProps {
  todos: TodoData;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const formatDateString = (year: number, month: number, day: number) => {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}년 ${m}월 ${d}일`;
};

export const Calendar = ({
  todos,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  const todayString = getTodayDateString();
  const today = new Date();

  const [currentViewDate, setCurrentViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth() + 1;

  const handlePrevMonth = () =>
    setCurrentViewDate(new Date(currentYear, currentMonth - 2, 1));
  const handleNextMonth = () =>
    setCurrentViewDate(new Date(currentYear, currentMonth, 1));

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
      {/* 1. 헤더 영역 */}
      <header className="mb-6">
        <div className="text-sm text-gray-500 mb-6">
          오늘: {today.getFullYear()}년 {today.getMonth() + 1}월{' '}
          {today.getDate()}일
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            &lt;
          </button>
          <h2 className="text-lg font-bold">
            {currentYear}년 {currentMonth}월
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </header>

      {/* 2. 요일 영역 */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className={`font-semibold py-2 ${day === '일' ? 'text-red-600' : day === '토' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {/* 첫 주 빈칸 */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="min-h-[80px]"></div>
        ))}

        {/* 실제 날짜 */}
        {days.map((day) => {
          const dateString = formatDateString(currentYear, currentMonth, day);
          const isToday = dateString === todayString;
          const isSelected = dateString === selectedDate;

          const dayTodos = todos[dateString] || [];
          const incompleteCount = dayTodos.filter(
            (todo) => !todo.isCompleted
          ).length;

          return (
            <div
              key={dateString}
              onClick={() => setSelectedDate(dateString)}
              className={`
                min-h-[80px] p-2 rounded-md flex flex-col items-center cursor-pointer transition-all border
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                    : 'border-gray-100 hover:bg-gray-50'
                }
              `}
            >
              <div
                className={`font-medium ${isToday ? 'text-midBlue' : 'text-gray-800'}`}
              >
                {day}
              </div>

              {isToday && (
                <span className="text-[10px] font-bold text-midBlue leading-none mt-1">
                  today
                </span>
              )}

              {incompleteCount > 0 && (
                <div className="text-xs text-deepBlue font-medium mt-auto mb-1">
                  미완료: {incompleteCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
