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
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1000000000h' });

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




// async function getuser(req, res) {
//   const token = req.headers.authorization;
//   console.log('received', token.split(' ')[1]);
  
//   const auth = await USERAUTH.findOne(
//     {token: token.split(' ')[1].trim()},
//     {user:1, email:1},
//     {new: true}
//   );
//   console.log('this is auth id',auth.user.id);
  
//   if (!auth) {
//     console.error(`authwronh`);
//     return res.status(404).json({ error: 'User not found' });
//   }
//   console.log("this is auth user", auth.user);
  
//   const user = await USER.findOne(
//     {_id: auth.user},
//     {childage:1, childname:1},
//     {new: true}
//   );

//   console.log(`user exists`, user);
//   // console.log(user);
//   return res.json({"user_details" : user}); 

// }


async function getuser(req, res) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }
    
    const token = authHeader.split(' ')[1].trim();
    console.log('Received token:', token);

    // Find user in USERAUTH collection by token
    const auth = await USERAUTH.findOne(
      { token: token },
      { user: 1, email: 1 }
    );

    if (!auth) {
      console.error('UserAuth not found for provided token');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('UserAuth found:', auth);

    // Find the associated user in the USER collection
    const user = await USER.findOne(
      { _id: auth.user },
      { childage: 1, childname: 1 }
    );

    if (!user) {
      console.error('User not found in USER collection');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    return res.status(200).json({ user_details: user });

  } catch (error) {
    console.error('Error in getuser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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
    
    // Create a JWT token
    const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET, { expiresIn: '10000000h' });
    userAuth.token = token;
    await userAuth.save();
    console.error( 'Login successful' );
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { adduser,getuser, loginuser};