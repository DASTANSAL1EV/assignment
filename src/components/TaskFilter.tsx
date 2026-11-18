import type { Filter } from '../types/task';

interface Props {
  value: Filter;
  onChange: (value: Filter) => void;
}

export default function TaskFilter({ value, onChange }: Props) {
  return (
    <select
      className="filter"
      value={value}
      onChange={(e) => onChange(e.target.value as Filter)}
    >
      <option value="all">Все</option>
      <option value="normal">Normal</option>
      <option value="middle">Middle</option>
      <option value="high">High</option>
    </select>
  );
}