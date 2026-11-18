import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import api from '../services/api';
import { PRIORITIES } from '../types/task';
import type { Task } from '../types/task';

const schema = yup.object({
  title: yup.string().trim().required('*Укажите название'),
  description: yup.string().trim().required('*Укажите описание'),
  priority: yup
    .string()
    .typeError('*Укажите приоритет')
    .oneOf(PRIORITIES, '*Укажите приоритет')
    .required('*Укажите приоритет'),
});

type FormValues = yup.InferType<typeof schema>;

interface Props {
  onCreated: (task: Task) => void;
}

export default function TaskForm({ onCreated }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await api.post<Task>('/tasks', { ...data, status: false });
      onCreated(res.data);
      reset();
      toast.success('Задача создана');
    } catch {
      toast.error('Не удалось создать задачу');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="task-form__row">
        <div className="field">
          <input className="input" placeholder="Название" {...register('title')} />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="field">
          <input className="input" placeholder="Описание" {...register('description')} />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div className="field">
          <div className="input priority">
            <span>Приоритет</span>
            {PRIORITIES.map((p) => (
              <label key={p} className={`badge badge--${p} badge--select`}>
                <input type="radio" value={p} {...register('priority')} />
                <span>{p}</span>
              </label>
            ))}
          </div>
          {errors.priority && <p className="error">{errors.priority.message}</p>}
        </div>
      </div>

      <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
        Создать задачу
      </button>
    </form>
  );
}