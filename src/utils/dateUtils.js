import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return ''
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (isToday(dateObj)) {
      return 'Today'
    } else if (isTomorrow(dateObj)) {
      return 'Tomorrow'
    } else if (isYesterday(dateObj)) {
      return 'Yesterday'
    } else {
      return formatDistanceToNow(dateObj, { addSuffix: true })
    }
  } catch (error) {
    console.error('Error formatting relative date:', error)
    return ''
  }
}

export const isOverdue = (dueDate, completed = false) => {
  if (!dueDate || completed) return false
  
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
    return dateObj < new Date()
  } catch (error) {
    console.error('Error checking if date is overdue:', error)
    return false
  }
}

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null
  
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
    const today = new Date()
    const diffTime = dateObj - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  } catch (error) {
    console.error('Error calculating days until due:', error)
    return null
  }
}