import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import AppIcon from "@/components/atoms/AppIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const ArchivedPage = () => {
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // UI state
  const [searchQuery, setSearchQuery] = useState('')

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
      setError('Failed to load archived tasks')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter archived tasks
  const archivedTasks = useMemo(() => {
    let filtered = tasks.filter(task => task.archived)

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Sort by completion date (most recent first)
    return filtered.sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    )
  }, [tasks, searchQuery])

  // Task operations
  const handleRestoreTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (!task) return

      const updatedTask = { ...task, archived: false }
      await taskService.update(taskId, updatedTask)
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))

      toast.success('Task restored successfully!')
      
    } catch (err) {
      toast.error('Failed to restore task')
      console.error('Error restoring task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to permanently delete this task? This action cannot be undone.')) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task permanently deleted')
      
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  const handleClearAllArchived = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all archived tasks? This action cannot be undone.')) {
      return
    }

    try {
      const archivedTaskIds = tasks.filter(t => t.archived).map(t => t.Id)
      
      await Promise.all(
        archivedTaskIds.map(id => taskService.delete(id))
      )
      
      setTasks(prev => prev.filter(t => !t.archived))
      toast.success('All archived tasks deleted')
      
    } catch (err) {
      toast.error('Failed to clear archived tasks')
      console.error('Error clearing archived tasks:', err)
    }
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

  return (
    <div className="flex flex-col h-full">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchClear={() => setSearchQuery('')}
        onAddTask={() => {}} // No add task in archived page
        completionPercentage={0}
        totalTasks={0}
        completedTasks={0}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Archived Tasks
              </h2>
              <p className="text-neutral-600">
                {archivedTasks.length} archived tasks
              </p>
            </div>

            {archivedTasks.length > 0 && (
              <Button
                variant="accent"
                icon="Trash2"
                onClick={handleClearAllArchived}
                className="ml-4"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {archivedTasks.map((task) => (
              <div key={task.Id} className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800 mb-2">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-neutral-600 mb-4">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <span>Category: {task.category}</span>
                      <span>Priority: {task.priority}</span>
                      {task.dueDate && (
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="RotateCcw"
                      onClick={() => handleRestoreTask(task.Id)}
                    >
                      Restore
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="Trash2"
                      onClick={() => handleDeleteTask(task.Id)}
                      className="text-accent-600 hover:text-accent-800"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {archivedTasks.length === 0 && (
<div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <AppIcon name="Archive" size={40} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">
                No archived tasks
              </h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                {searchQuery 
                  ? "No archived tasks match your search" 
                  : "Completed tasks will appear here when archived"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArchivedPage