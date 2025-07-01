import { mockCategories } from "@/services/mockData/categories.json";
import React from "react";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class CategoryService {
  constructor() {
    this.categories = [...mockCategories]
    this.nextId = Math.max(...this.categories.map(c => parseInt(c.Id))) + 1
  }

  async getAll() {
    await delay(200)
    return [...this.categories]
  }

  async getById(id) {
    await delay(150)
    const category = this.categories.find(c => c.Id === id.toString())
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }

async create(categoryData) {
    await delay(300)
    
    const newCategory = {
      Id: (this.nextId++).toString(),
      name: categoryData.name,
      color: categoryData.color || '#5B4EF5',
      icon: categoryData.icon || 'Folder'
    }

    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, categoryData) {
    await delay(250)
    
    const index = this.categories.findIndex(c => c.Id === id.toString())
    if (index === -1) {
      throw new Error('Category not found')
    }

    const updatedCategory = {
      ...this.categories[index],
      ...categoryData,
      Id: id.toString() // Ensure Id remains string
    }

    this.categories[index] = updatedCategory
    return { ...updatedCategory }
  }

  async delete(id) {
    await delay(200)
    
    const index = this.categories.findIndex(c => c.Id === id.toString())
    if (index === -1) {
      throw new Error('Category not found')
    }

    this.categories.splice(index, 1)
    return true
  }
}

export const categoryService = new CategoryService()