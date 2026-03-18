import { useCallback, useEffect, useState } from "react";
import type { TodoData, Todo } from "../../types/todo";
import { getTodosFromStorage, setTodosToStorage } from "../../utils/storage";

const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const useTodos = () => {
    // todo 아이템을 로컬스토리지에서 받아오는 초기화
    const [todos, setTodos] = useState<TodoData>(getTodosFromStorage);
    // 선택된 날짜 초기화
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

    // 데이터 변경 시 로컬스토리지도 같이 변경
    useEffect(() => {
        setTodosToStorage(todos);
    }, [todos]);

    // CRUD함수를 useCallback으로 구현(useState를 사용하면 리렌더링이 자주 발생하는 문제가 생김. 따라서 자식 컴포넌트에 props로 넘겨주기만 하는 useCallback 사용)
    const addTodo = useCallback((date: string, text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: text,
            isCompleted: false,
        };

        setTodos((prev) => ({
            ...prev,
            [date]: [...(prev[date] || []), newTodo],
        }));
    }, []);

    const toggleTodo = useCallback((date: string, id: string) => {
        setTodos((prev) => ({
            ...prev,
            [date]: prev[date].map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
        }));
    }, []);

    const deleteTodo = useCallback((date: string, id: string) => {
        setTodos((prev) => ({
            ...prev,
            [date]: prev[date].filter((todo) => todo.id !== id)
        }));
    }, []);

    return {
        todos,
        selectedDate,
        setSelectedDate,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
}