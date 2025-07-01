import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import TaskList from '@/components/organisms/TaskList'
import TaskModal from '@/components/organisms/TaskModal'
import FilterTabs from '@/components/molecules/FilterTabs'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TasksPage = () => {
  const { categoryId } = useParams()
  
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // UI state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
      
    } catch (err) {
      setError('Failed to load tasks')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => !task.archived)

    // Apply category filter
    if (categoryId && categoryId !== 'all') {
      const category = categories.find(cat => cat.Id === categoryId)
      if (category) {
        filtered = filtered.filter(task => task.category === category.name)
      }
    }

    // Apply status filter
    switch (activeFilter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed)
        break
      case 'completed':
        filtered = filtered.filter(task => task.completed)
        break
      case 'high':
        filtered = filtered.filter(task => task.priority === 'High' && !task.completed)
        break
      default:
        break
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Sort by priority and date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      
      // Sort by priority
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      
      // Sort by creation date
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [tasks, categories, categoryId, activeFilter, searchQuery])

  // Calculate stats
  const stats = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.archived)
    const completed = activeTasks.filter(task => task.completed).length
    const total = activeTasks.length
    const percentage = total > 0 ? (completed / total) * 100 : 0

    const counts = {
      all: activeTasks.length,
      pending: activeTasks.filter(task => !task.completed).length,
      completed: completed,
      high: activeTasks.filter(task => task.priority === 'High' && !task.completed).length
    }

    return { completed, total, percentage, counts }
  }, [tasks])

  // Task operations
  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (!task) return

      const updatedTask = { ...task, completed: !task.completed }
      await taskService.update(taskId, updatedTask)
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))

      toast.success(
        updatedTask.completed ? 'Task completed! 🎉' : 'Task marked as pending',
        { icon: updatedTask.completed ? '✅' : '⏰' }
      )
      
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleSaveTask = async (taskIdOrData, taskData = null) => {
    try {
      let savedTask
      
      if (taskData) {
        // Edit existing task
        savedTask = await taskService.update(taskIdOrData, taskData)
        setTasks(prev => prev.map(t => 
          t.Id === taskIdOrData ? savedTask : t
        ))
        toast.success('Task updated successfully!')
      } else {
        // Create new task
        savedTask = await taskService.create(taskIdOrData)
        setTasks(prev => [savedTask, ...prev])
        toast.success('Task created successfully!')
      }
      
    } catch (err) {
      toast.error('Failed to save task')
      console.error('Error saving task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task deleted successfully')
      
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  // UI handlers
  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const getCurrentCategory = () => {
    if (!categoryId || categoryId === 'all') return null
    return categories.find(cat => cat.Id === categoryId)
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-neutral-200">
          <div className="h-10 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div className="flex-1 p-6">
          <Loading variant="tasks" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-neutral-200">
          <div className="h-10 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    )
  }

  const currentCategory = getCurrentCategory()
  const pageTitle = currentCategory ? currentCategory.name : 'All Tasks'

  return (
    <div className="flex flex-col h-full">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchClear={() => setSearchQuery('')}
        onAddTask={handleAddTask}
        completionPercentage={stats.percentage}
        totalTasks={stats.total}
        completedTasks={stats.completed}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {pageTitle}
            </h2>
            <p className="text-neutral-600">
              {currentCategory 
                ? `Tasks in ${currentCategory.name} category`
                : 'Manage all your tasks in one place'
              }
            </p>
          </div>

          <div className="mb-8">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={stats.counts}
            />
          </div>

          <TaskList
            tasks={filteredTasks}
            categories={categories}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            emptyMessage={
              searchQuery 
                ? "No tasks match your search" 
                : activeFilter === 'completed' 
                  ? "No completed tasks yet"
                  : activeFilter === 'pending'
                    ? "No pending tasks"
                    : activeFilter === 'high'
                      ? "No high priority tasks"
                      : currentCategory
                        ? `No tasks in ${currentCategory.name}`
                        : "No tasks yet"
            }
            emptyDescription={
              searchQuery
                ? "Try adjusting your search terms or filters"
                : activeFilter === 'completed'
                  ? "Complete some tasks to see them here"
                  : "Create your first task to get started with organizing your day"
            }
          />
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
        categories={categories}
      />
    </div>
  )
}

export default TasksPage