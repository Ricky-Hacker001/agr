import Leadership from '../models/Leadership.js';

const shape = (l) => ({
  id:    l._id.toString(),
  name:  l.name,
  role:  l.role,
  class: l.class,
  photo: l.photo ?? null,
  quote: l.quote ?? '',
  year:  l.year,
});

export const getLeaders = async (_req, res) => {
  try {
    const items = await Leadership.find().sort({ year: -1 });
    res.json(items.map(shape));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeaderById = async (req, res) => {
  try {
    const item = await Leadership.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(shape(item));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createLeader = async (req, res) => {
  try {
    const { id: _id, leaderId: _lid, ...data } = req.body;
    const item = await Leadership.create(data);
    res.status(201).json(shape(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateLeader = async (req, res) => {
  try {
    const { id: _id, leaderId: _lid, ...data } = req.body;
    const item = await Leadership.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(shape(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteLeader = async (req, res) => {
  try {
    const item = await Leadership.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
