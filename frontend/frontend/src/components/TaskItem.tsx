import { Task } from "@/types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.name}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>

      <div className="space-x-2">
        <button className="text-blue-600" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="text-red-600" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
