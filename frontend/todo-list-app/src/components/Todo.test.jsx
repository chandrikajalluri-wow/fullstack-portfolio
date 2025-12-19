import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Todo from './Todo';

vi.mock('../customhooks/useLocalStorage', () => ({
  useLocalStorage: (key, initialValue) => {
    let state = initialValue;
    return React.useState(state);
  },
}));

describe('Todo Component', () => {
  beforeEach(() => {
    // Clear any side effects if needed
  });

  it('renders the Todo app', async () => {
    render(<Todo />);
    expect(await screen.findByText('To-Do List')).toBeInTheDocument();
  });

  it('allows adding a todo', async () => {
    render(<Todo />);
    const input = await screen.findByPlaceholderText('Add your task');
    const addButton = screen.getByText('ADD +');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('allows toggling a todo', async () => {
    render(<Todo />);
    const input = await screen.findByPlaceholderText('Add your task');
    const addButton = screen.getByText('ADD +');

    fireEvent.change(input, { target: { value: 'Task to Toggle' } });
    fireEvent.click(addButton);

    // Initial state: Not completed
    const notCompletedIcon = screen.getByAltText('Not completed');
    fireEvent.click(notCompletedIcon);

    // After toggle: Completed
    expect(screen.getByAltText('Completed')).toBeInTheDocument();
  });

  it('allows deleting a todo', async () => {
    render(<Todo />);
    const input = await screen.findByPlaceholderText('Add your task');
    // Button text might be same, but better to be safe
    const addButton = screen.getByText('ADD +');

    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);

    expect(await screen.findByText('Task to Delete')).toBeInTheDocument();

    // Check dashboard updates
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // 1 total task

    const deleteButton = screen.getByAltText('Delete task');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
  });

  it('filters todos by search', async () => {
    render(<Todo />);
    const input = await screen.findByPlaceholderText('Add your task');
    const addButton = screen.getByText('ADD +');

    fireEvent.change(input, { target: { value: 'Buy Milk' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Walk Dog' } });
    fireEvent.click(addButton);

    expect(await screen.findByText('Buy Milk')).toBeInTheDocument();
    expect(screen.getByText('Walk Dog')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'Milk' } });

    expect(screen.getByText('Buy Milk')).toBeInTheDocument();
    expect(screen.queryByText('Walk Dog')).not.toBeInTheDocument();
  });
});
