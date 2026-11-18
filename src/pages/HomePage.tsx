import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskCard from '../components/TaskCard';
import type { Task, Filter } from '../types/task';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Task[]>('/tasks')
      .then((res) => setTasks(res.data))
      .catch(() => toast.error('Не удалось загрузить задачи'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (task: Task) => setTasks((prev) => [...prev, task]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.info('Задача удалена');
    } catch {
      toast.error('Не удалось удалить задачу');
    }
  };

  const filtered = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.status;
    if (filter === 'done') return t.status;
    return t.priority === filter;
  });

  return (
    <>
      <h1 className="title">Задачи</h1>
      <h2 className="subtitle">Форма добавления</h2>
      <TaskForm onCreated={handleCreated} />

      <div className="list-head">
        <h2 className="subtitle">Список задач</h2>
        <TaskFilter value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : filtered.length === 0 ? (
        <p>Задач нет</p>
      ) : (
        <div className="grid">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
}