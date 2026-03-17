import type { TodoData } from '../types/todo.ts';

const STORAGE_KEY = 'calendar_todos';

// 로컬스토리지 데이터 get함수
export const getTodosFromStorage = (): TodoData => {
  if (typeof window === 'undefined') return {};

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

//로컬스토리지 데이터 set함수
export const setTodosToStorage = (data: TodoData): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('LocalStorage에 데이터를 저장하는데 실패했습니다:', error);
  }
};