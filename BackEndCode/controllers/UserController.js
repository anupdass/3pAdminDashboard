const User = require("../models/usermodel");


exports.getUserProfileByID = async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateUserRole = async (req, res) => {
    const { adminId, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            adminId,
            { role },
            { new: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User role updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateUserProfile = async (req, res) => {
    try {
        const { name, mobile, division, district, upazila, picture, companyName } = req.body;



        // Build update object dynamically
        const updateData = {};
        updateData.name = name?.trim();
        updateData.companyName = companyName?.trim();
        updateData.mobile = mobile?.trim();
        updateData.division = division?.trim();
        updateData.district = district?.trim();
        updateData.upazila = upazila?.trim();
        updateData.picture = picture?.trim();


        const user = await usermodel.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User profile updated successfully',
            user,
        });

    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            message: 'Server error while updating user profile',
            error: err.message,
        });
    }
};