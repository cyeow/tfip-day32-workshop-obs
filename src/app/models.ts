export interface Todo {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
}

export interface Task {
    name: string;
    priority: number;
    dueDate: string;
    completed: boolean;
}