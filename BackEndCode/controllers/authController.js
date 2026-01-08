const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = require('../utils/generateToken');

const User = require('../models/usermodel');

exports.registerUser = async (req, res) => {
    const { name, password, mobile } = req.body;

    try {
        let user = await User.findOne({ mobile });

        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, password: hashedPassword, mobile });

        // console.log('ca', user);

        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, name: user.name, mobile: user.mobile } });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


exports.loginUser = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id, user.role);

        res.json({ token, user: { id: user._id, name: user.name, mobile: user.mobile } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.changePassword = async (req, res) => {
    const { currentpass, newpass } = req.body;
    const userId = req.user.id;

    try {
        if (!currentpass || !newpass) {
            return res.json({ message: 'অনুগ্রহ করে বর্তমান এবং নতুন উভয় পাসওয়ার্ডই দিন।' });
        }

        if (currentpass === newpass) {
            return res.json({ message: 'নতুন পাসওয়ার্ড অবশ্যই বর্তমান পাসওয়ার্ড থেকে আলাদা হতে হবে' });
        }

        if (newpass.length < 6) {
            return res.json({ message: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' });
        const isMatch = await bcrypt.compare(currentpass, user.password);
        if (!isMatch) return res.json({ message: 'বর্তমান পাসওয়ার্ডটি ভুল।' });
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(newpass, salt);
        console.log('Hashed Password:', hashedPassword);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.googleAuth = async (req, res) => {
    const { idToken } = req.body;

    try {
        if (!idToken) return res.status(400).json({ message: 'No idToken provided' });

        // 1. Verify Google ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // 2. Find user in DB
        let user = await User.findOne({ email });

        // 3. If not found, create a new one
        if (!user) {
            user = new User({
                name,
                email,
                googleId,
                picture,
                mobile: null,
                password: null // no password for Google accounts
            });
            await user.save(); // <--- This saves to MongoDB
        }

        // 4. Create your JWT
        const token = generateToken(user._id);

        // 5. Send back token + user info
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google authentication failed' });
    }
};