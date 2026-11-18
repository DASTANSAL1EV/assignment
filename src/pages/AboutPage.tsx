import { useNavigate } from 'react-router-dom';
import illustration from '../assets/Rectangle 53.png';

interface Value {
  n: string;
  title: string;
  text: string;
}

const VALUES: Value[] = [
  { n: '01.', title: 'Просто и эффективно', text: 'Наше приложение объединяет удобство и мощный функционал: создавайте задачи, отмечайте выполненные и управляйте своим временем.' },
  { n: '02.', title: 'Умный трекинг', text: 'Система отслеживания помогает видеть прогресс, контролировать привычки и структурировать дела в одном месте.' },
  { n: '03.', title: 'Современный дизайн', text: 'Интерфейс, который идеально смотрится и работает на любом устройстве — понятно, аккуратно и приятно для глаз.' },
  { n: '04.', title: 'Персональные настройки', text: 'Гибкие категории, напоминания и приоритеты — настройте приложение так, как удобно именно вам.' },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="about">
        <div className="about__text">
          <p>
            Наше приложение помогает организовать задачи, следить за прогрессом
            и достигать целей каждый день — легко, удобно и без лишнего хаоса.
          </p>
          <button className="btn btn--outline" onClick={() => navigate('/')}>
            Перейти к задачам
          </button>
        </div>
        <img className="about__img" src={illustration} alt="Task Manager" />
      </section>

      <section className="values">
        <h2 className="values__title">Наши ценности</h2>
        <p className="values__lead">
          Коротко и ясно о том, что делает наше приложение удобным, полезным и
          незаменимым для вашего ежедневного планирования.
        </p>
        <div className="values__grid">
          {VALUES.map((v) => (
            <div key={v.n}>
              <div className="values__num">{v.n}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}