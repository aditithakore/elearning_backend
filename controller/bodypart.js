const BODYPART = require('../model/bodypart');

async function addBodypart(req,res){
  const {name,imageUrl} =req.body;

  try{
    const newBodypart = await BODYPART.create({
      name,
      imageUrl
    });

    await newBodypart.save();

    return res.status(201).json({message: 'Bodypart added successfully'});
  }
  catch (error) {
    console.error('Error adding bodypart:', error);
    return res.status(500).json({ error: 'bodypart not added' });
  }
}


async function getAllBodyparts(req, res) {
  try {
    const bodyParts = await BODYPART.find();
    console.log(bodyParts);
    return res.status(200).json({ bodyParts });
  } catch (error) {
    console.error('Error fetching body parts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addBodypart,getAllBodyparts};