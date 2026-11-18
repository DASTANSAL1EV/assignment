import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/task';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <article className="card">
      <span className={`badge badge--${task.priority} card__badge`}>{task.priority}</span>
      <h3 className="card__title">№{task.id} {task.title}</h3>
      <p className="card__text">{task.description}</p>

      <div className="card__actions">
        <button className="btn btn--outline" onClick={() => navigate(`/tasks/${task.id}`)}>
          Открыть
        </button>
        <button className="btn btn--outline" onClick={() => onDelete(task.id)}>
          Удалить
        </button>
      </div>
    </article>
  );
}