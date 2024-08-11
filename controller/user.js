const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER = require('../model/user');
const USERAUTH = require('../model/userauth');

const saltRounds = 10; // For bcrypt hashing

async function adduser(req, res) {
  const { email, password, childage, childname, childdisability } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the User document
    const newUser = await USER.create({
    
      childage,
      childname,
      childdisability
    });

    if (!newUser) {
      return res.status(500).json({ error: 'User creation failed' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Create the UserAuth document
    const newUserAuth = await USERAUTH.create({
      user: newUser._id,
      email,
      password: hashedPassword,
      token,
      lastLogin: new Date()
    });

    if (!newUserAuth) {
      return res.status(500).json({ error: 'User authentication creation failed' });
    }

    
    console.log('User registered successfully');
    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'User registration failed' });
  }
}




async function getuser(req, res) {
  const _id= req.params.id;
  const user = await USER.findOne(
    {_id:_id},
    {childname:1,childage:1},
    {new: true}
  );
  if (!user) {
    console.error(`user not found`);
    return res.status(404).json({ error: 'User not found' });
  }
  console.error(`user exists`);
  console.log(user);
  return res.json({"user_details" : user}); 

}


async function loginuser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const userAuth = await USERAUTH.findOne({ email }).populate('user');
    if (!userAuth) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, userAuth.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Update last login
    userAuth.lastLogin = new Date();
    await userAuth.save();

    // Create a JWT token
    const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.error( 'Login successful' );
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { adduser,getuser, loginuser};