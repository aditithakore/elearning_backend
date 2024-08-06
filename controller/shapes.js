const SHAPE = require('../model/shapes');

async function addShape(req,res){
  const {name,imageUrl} =req.body;

  try{
    const newShape = await SHAPE.create({
      name,
      imageUrl
    });

    await newShape.save();

    return res.status(201).json({message: 'Shape added successfully'});
  }
  catch (error) {
    console.error('Error adding Shape:', error);
    return res.status(500).json({ error: 'Shape not added' });
  }
}


async function getAllShape(req, res) {
  try {
    const shape = await SHAPE.find();
    console.log(shape);
    return res.status(200).json({ shape });
  } catch (error) {
    console.error('Error fetching shape:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addShape,getAllShape};