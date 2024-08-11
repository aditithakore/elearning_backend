const NUMBER = require('../model/numbers');

async function addNumber(req,res){
  const {name,imageUrl} =req.body;

  try{
    const newNumber = await NUMBER.create({
      name,
      imageUrl
    });

    await newNumber.save();

    return res.status(201).json({message: 'Number added successfully'});
  }
  catch (error) {
    console.error('Error adding Number:', error);
    return res.status(500).json({ error: 'Number not added' });
  }
}


async function getAllNumber(req, res) {
  try {
    const numbers = await NUMBER.find();
    console.log(numbers);
    return res.status(200).json({ numbers });
  } catch (error) {
    console.error('Error fetching numbers:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addNumber,getAllNumber};