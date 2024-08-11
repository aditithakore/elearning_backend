const HABIT = require('../model/habits');

async function addHabit(req,res){
  const {doUrl,statement,dontUrl} =req.body;

  try{
    const newHabit = await HABIT.create({
      doUrl,statement,dontUrl
    });

    await newHabit.save();

    return res.status(201).json({message: 'Habit added successfully'});
  }
  catch (error) {
    console.error('Error adding Habit:', error);
    return res.status(500).json({ error: 'Habit not added' });
  }
}


async function getAllHabit(req, res) {
  try {
    const habit = await HABIT.find();
    console.log(habit);
    return res.status(200).json({ habit });
  } catch (error) {
    console.error('Error fetching habit:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addHabit,getAllHabit};