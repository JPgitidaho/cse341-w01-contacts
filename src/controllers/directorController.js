import Director from '../models/Director.js';

export const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ error: 'Director not found' });
    res.json(director);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createDirector = async (req, res) => {
  try {
    const { name, nationality } = req.body;
    if (!name || !nationality) return res.status(400).json({ error: 'Missing required fields' });
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateDirector = async (req, res) => {
  try {
    const { name, nationality } = req.body;
    if (!name || !nationality) return res.status(400).json({ error: 'Missing required fields' });
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!director) return res.status(404).json({ error: 'Director not found' });
    res.json(director);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) return res.status(404).json({ error: 'Director not found' });
    res.json({ message: 'Director deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
