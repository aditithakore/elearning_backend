const ALPHABET = require('../model/alphabets');

async function addAlphabet(req,res){
  const {alphabetUrl,word,imageUrl} =req.body;

  try{
    const newAlphabet = await ALPHABET.create({
      alphabetUrl,
      word,
      imageUrl
    });

    await newAlphabet.save();

    return res.status(201).json({message: 'Alphabet added successfully'});
  }
  catch (error) {
    console.error('Error adding Alphabet:', error);
    return res.status(500).json({ error: 'Alphabet not added' });
  }
}


async function getAllAlphabet(req, res) {
  try {
    const alphabet = await ALPHABET.find();
    console.log(alphabet);
    return res.status(200).json({ alphabet });
  } catch (error) {
    console.error('Error fetching alphabet:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addAlphabet,getAllAlphabet};