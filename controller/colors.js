const COLOR = require('../model/colors');

async function addColor(req,res){
  const {name,imageUrl} =req.body;

  try{
    const newColor = await COLOR.create({
      name,
      imageUrl
    });

    await newColor.save();

    return res.status(201).json({message: 'Color added successfully'});
  }
  catch (error) {
    console.error('Error adding Color:', error);
    return res.status(500).json({ error: 'Color not added' });
  }
}


async function getAllColor(req, res) {
  try {
    const color = await COLOR.find();
    console.log(color);
    return res.status(200).json({ color });
  } catch (error) {
    console.error('Error fetching color:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addColor,getAllColor};