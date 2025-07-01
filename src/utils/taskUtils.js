export const getPriorityColor = (priority) => {
  const colors = {
    'High': 'text-accent-600 bg-accent-100',
    'Medium': 'text-warning-600 bg-warning-100',
    'Low': 'text-success-600 bg-success-100'
  }
  return colors[priority] || colors['Medium']
}

export const getPriorityWeight = (priority) => {
  const weights = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  }
  return weights[priority] || 2
}

export const sortTasks = (tasks, sortBy = 'priority') => {
  return [...tasks].sort((a, b) => {
    // Completed tasks always go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    switch (sortBy) {
      case 'priority':
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
      
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt)
      
      case 'updated':
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      
      case 'title':
        return a.title.localeCompare(b.title)
      
      default:
        return 0
    }
  })
}

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Filter by completion status
    if (filters.completed !== undefined && task.completed !== filters.completed) {
      return false
    }

    // Filter by priority
    if (filters.priority && task.priority !== filters.priority) {
      return false
    }

    // Filter by category
    if (filters.category && task.category !== filters.category) {
      return false
    }

    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const searchFields = [task.title, task.description, task.category].filter(Boolean)
      const matches = searchFields.some(field => 
        field.toLowerCase().includes(query)
      )
      if (!matches) return false
    }

    // Filter by date range
    if (filters.dateFrom) {
      const taskDate = new Date(task.dueDate || task.createdAt)
      if (taskDate < new Date(filters.dateFrom)) {
        return false
      }
    }

    if (filters.dateTo) {
      const taskDate = new Date(task.dueDate || task.createdAt)
      if (taskDate > new Date(filters.dateTo)) {
        return false
      }
    }

    return true
  })
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed
  const overdue = tasks.filter(t => 
    !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length

  const priorityStats = {
    high: tasks.filter(t => t.priority === 'High' && !t.completed).length,
    medium: tasks.filter(t => t.priority === 'Medium' && !t.completed).length,
    low: tasks.filter(t => t.priority === 'Low' && !t.completed).length
  }

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return {
    total,
    completed,
    pending,
    overdue,
    priorityStats,
    completionRate
  }
}