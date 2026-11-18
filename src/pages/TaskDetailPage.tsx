import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../services/api';
import type { Task } from '../types/task';

interface EditValues {
  title: string;
  description: string;
  status: boolean;
}

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm<EditValues>();

  useEffect(() => {
    api
      .get<Task>(`/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch(() => setTask(null))
      .finally(() => setLoading(false));
  }, [id]);

  const startEdit = () => {
    if (!task) return;
    reset({ title: task.title, description: task.description, status: task.status });
    setEditing(true);
  };

  const onSave = async (data: EditValues) => {
    try {
      const res = await api.patch<Task>(`/tasks/${id}`, {
        title: data.title.trim(),
        description: data.description.trim(),
        status: data.status,
      });
      setTask(res.data);
      setEditing(false);
      toast.success('Изменения сохранены');
    } catch {
      toast.error('Не удалось сохранить');
    }
  };

  const onDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.info('Задача удалена');
      navigate('/');
    } catch {
      toast.error('Не удалось удалить задачу');
    }
  };

  if (loading) return <p>Загрузка...</p>;

  if (!task) {
    return (
      <>
        <button className="back" onClick={() => navigate('/')}>‹ Назад</button>
        <p>Задача не найдена</p>
      </>
    );
  }

  return (
    <div className="detail">
      <button className="back" onClick={() => navigate('/')}>‹ Назад</button>

      {editing ? (
        <form onSubmit={handleSubmit(onSave)}>
          <input className="input" {...register('title', { required: true })} />
          <textarea
            className="input textarea"
            rows={5}
            {...register('description', { required: true })}
          />
          <label className="check">
            <input type="checkbox" {...register('status')} /> Выполнено
          </label>
          <div className="detail__footer">
            <button type="button" className="btn btn--outline" onClick={() => setEditing(false)}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">Сохранить</button>
          </div>
        </form>
      ) : (
        <>
          <div className="detail__head">
            <h3>№{task.id} {task.title}</h3>
            <span className={`badge badge--${task.priority}`}>{task.priority}</span>
          </div>
          <p className="detail__status">Статус: {task.status ? 'выполнено' : 'в процессе'}</p>
          <p className="detail__text">{task.description}</p>
          <div className="detail__footer">
            <button className="icon-btn" onClick={onDelete} title="Удалить">Удалить</button>
            <button className="icon-btn" onClick={startEdit} title="Изменить">Редактировать</button>
          </div>
        </>
      )}
    </div>
  );
}