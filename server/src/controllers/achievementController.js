import Achievement from '../models/Achievement.js';

// Helper: shape a document for the client (uses _id as id)
const shape = (a) => ({
  id:          a._id.toString(),
  title:       a.title,
  category:    a.category,
  description: a.description,
  year:        a.year,
  studentName: a.studentName ?? '',
  award:       a.award ?? '',
  photos:      a.photos ?? [],
});

export const getAchievements = async (_req, res) => {
  try {
    const items = await Achievement.find().sort({ year: -1 });
    res.json(items.map(shape));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAchievementById = async (req, res) => {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(shape(item));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    // Strip any id/achievementId fields coming from client — let MongoDB generate _id
    const { id: _id, achievementId: _aid, ...data } = req.body;
    const item = await Achievement.create(data);
    res.status(201).json(shape(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const { id: _id, achievementId: _aid, ...data } = req.body;
    const item = await Achievement.findByIdAndUpdate(
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

export const deleteAchievement = async (req, res) => {
  try {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
