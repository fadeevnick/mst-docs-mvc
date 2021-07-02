import React from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, FiltersType } from '../constants/TodoFilters';
import { useStore } from '../StateProvider';

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: 'Completed'
}

function Footer() {
  const { todosStore: store } = useStore();

  function renderTodoCount() {
    const { activeCount } = store;
    const itemWord = activeCount === 1 ? 'item' : "items"

    return (
      <span>
        <strong>{activeCount || "NO"}</strong>
      </span>
    )
  }

  function renderFilterLink(filter: FiltersType) {
    const title = FILTER_TITLES[filter];
    const selectedFilter = store.filter;

    return (
      <a onClick={() => store.setFilter(filter)}>{title}</a>
    )
  }

  function renderClearButton() {
    const { completedCount, clearCompleted } = store;

    if (completedCount > 0) {
      return (
        <button onClick={() => clearCompleted()}>
          Clear completed
        </button>
      )
    }
  }

  return <div>
    {renderTodoCount()}
    <ul>
      {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((filter: FiltersType) => (
        <li key={filter}>{renderFilterLink(filter)}</li>
      ))}
    </ul>
    {renderClearButton()}
  </div>
}

export default Footer;