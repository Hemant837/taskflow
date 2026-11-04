import { ListTodo, Clock3, CheckCircle2 } from "lucide-react";

interface StatsCardsProps {
  total: number;
  pending: number;
  completed: number;
}

const StatsCards = ({ total, pending, completed }: StatsCardsProps) => {
  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon blue">
          <ListTodo size={22} />
        </div>
        <div>
          <p>Total Tasks</p>
          <h2>{total}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon orange">
          <Clock3 size={22} />
        </div>
        <div>
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <CheckCircle2 size={22} />
        </div>
        <div>
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
