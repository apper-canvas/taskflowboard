import { mockTasks } from '@/services/mockData/tasks.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
    this.nextId = Math.max(...this.tasks.map(t => t.Id)) + 1
  }

  async getAll() {
    await delay(300)
    return [...this.tasks]
  }

  async getById(id) {
    await delay(200)
    const task = this.tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

  async create(taskData) {
    await delay(400)
    
    const newTask = {
      Id: this.nextId++,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      category: taskData.category,
      dueDate: taskData.dueDate || null,
      completed: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.tasks.unshift(newTask)
    return { ...newTask }
  }

  async update(id, taskData) {
    await delay(300)
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }

    const updatedTask = {
      ...this.tasks[index],
      ...taskData,
      Id: parseInt(id), // Ensure Id remains integer
      updatedAt: new Date().toISOString()
    }

    this.tasks[index] = updatedTask
    return { ...updatedTask }
  }

  async delete(id) {
    await delay(200)
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }

    this.tasks.splice(index, 1)
    return true
  }

  // Utility methods
  async getByCategory(category) {
    await delay(250)
    return this.tasks.filter(t => t.category === category)
  }

  async getByStatus(completed) {
    await delay(250)
    return this.tasks.filter(t => t.completed === completed)
  }

  async archive(id) {
    return this.update(id, { archived: true })
  }

  async restore(id) {
    return this.update(id, { archived: false })
  }
}

export const taskService = new TaskService()