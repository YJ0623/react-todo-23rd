export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
}

export type TodoData = Record<string, Todo[]>;