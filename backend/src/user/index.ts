import { Router } from 'express';
import middleware from '../auth/middleware';
import User from '../models/users';
import { admin } from '../auth';

const router = Router();

export default router;

router.use(middleware);

/**
 * @route   PUT /user/update
 * @desc    Update user email and/or name
 * @access  Private (Requires Authentication)
 */
router.put('/update', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token required' });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;
        const { email, name } = req.body;

        if (!email && !name) {
            res.status(400).json({ message: 'At least one of email or name must be provided.' });
            return;
        }

        const updateFields: { email?: string; name?: string } = {};
        if (email) updateFields.email = email;
        if (name) updateFields.name = name;

        const updatedUser = await User.findOneAndUpdate(
            { uid: userId },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error: (error as Error).message });
    }
});
