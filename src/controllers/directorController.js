import Director from '../models/Director.js'

export const getDirectors = async (req, res, next) => {
  try {
    const directors = await Director.find()
    res.json(directors)
  } catch (err) {
    next(err)
  }
}

export const getDirectorById = async (req, res, next) => {
  try {
    const director = await Director.findById(req.params.id)
    if (!director) {
      const error = new Error('Director not found')
      error.status = 404
      throw error
    }
    res.json(director)
  } catch (err) {
    next(err)
  }
}

export const createDirector = async (req, res, next) => {
  try {
    const { name, nationality } = req.body
    if (!name || !nationality) {
      const error = new Error('Missing required fields')
      error.status = 400
      throw error
    }
    const director = new Director(req.body)
    await director.save()
    res.status(201).json(director)
  } catch (err) {
    next(err)
  }
}

export const updateDirector = async (req, res, next) => {
  try {
    const { name, nationality } = req.body
    if (!name || !nationality) {
      const error = new Error('Missing required fields')
      error.status = 400
      throw error
    }
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!director) {
      const error = new Error('Director not found')
      error.status = 404
      throw error
    }
    res.json(director)
  } catch (err) {
    next(err)
  }
}

export const deleteDirector = async (req, res, next) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id)
    if (!director) {
      const error = new Error('Director not found')
      error.status = 404
      throw error
    }
    res.json({ message: 'Director deleted' })
  } catch (err) {
    next(err)
  }
}
