import "./Filters.css";

interface FiltersProps {
  categories: any[];
  activeCategory: string;
  setActiveCategory: any;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="filters">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`filter-item ${
            activeCategory === category.id ? "active" : ""
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default Filters;
