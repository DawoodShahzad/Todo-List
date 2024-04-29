// models/TodoList.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
}

interface TodoListDocument extends Document {
    items: TodoItem[];
}

const TodoListSchema = new Schema<TodoListDocument>({
    items: [{
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }]
});

const TodoList = mongoose.model<TodoListDocument>('TodoList', TodoListSchema);

export default TodoList;
