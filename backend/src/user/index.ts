import { Router } from 'express';
import middleware from '../auth/middleware';
import User, { IUser, IVehicle } from '../models/users';
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

/**
 * @route   GET /user/vehicles
 * @desc    Get user's vehicles
 * @access  Private (Requires Authentication)
 */
router.get('/vehicles', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token required' });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const user = await User.findOne({ uid: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json({ vehicles: user.vehicles || [] });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles.', error: (error as Error).message });
    }
});

/**
 * @route   POST /user/vehicles
 * @desc    Add a new vehicle
 * @access  Private (Requires Authentication)
 */
router.post('/vehicles', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token required' });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;
        const { make, model, year, licensePlate, color } = req.body;

        if (!make || !model || !year || !licensePlate || !color) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const user = await User.findOne({ uid: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const newVehicle: IVehicle = {
            id: Date.now().toString(), // Simple unique ID
            make,
            model,
            year,
            licensePlate,
            color
        };

        user.vehicles = user.vehicles || [];
        user.vehicles.push(newVehicle);

        await user.save();

        res.status(201).json({ message: 'Vehicle added successfully.', vehicle: newVehicle });

    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle.', error: (error as Error).message });
    }
});

/**
 * @route   PUT /user/vehicles/:id
 * @desc    Update a vehicle
 * @access  Private (Requires Authentication)
 */
router.put('/vehicles/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token required' });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;
        const vehicleId = req.params.id;
        const { make, model, year, licensePlate, color } = req.body;

        if (!make || !model || !year || !licensePlate || !color) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const user = await User.findOne({ uid: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const vehicleIndex = user.vehicles?.findIndex((v: IVehicle) => v.id === vehicleId);
        if (vehicleIndex === -1) {
            res.status(404).json({ message: 'Vehicle not found.' });
            return;
        }

        const updatedVehicle: IVehicle = {
            id: vehicleId,
            make,
            model,
            year,
            licensePlate,
            color
        };

        user.vehicles[vehicleIndex] = updatedVehicle;

        await user.save();

        res.status(200).json({ message: 'Vehicle updated successfully.', vehicle: updatedVehicle });

    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle.', error: (error as Error).message });
    }
});

/**
 * @route   DELETE /user/vehicles/:id
 * @desc    Delete a vehicle
 * @access  Private (Requires Authentication)
 */
router.delete('/vehicles/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token required' });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;
        const vehicleId = req.params.id;

        const user = await User.findOne({ uid: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const initialLength = user.vehicles?.length || 0;
        user.vehicles = user.vehicles?.filter((v: IVehicle) => v.id !== vehicleId) || [];
        
        if (user.vehicles.length === initialLength) {
            res.status(404).json({ message: 'Vehicle not found.' });
            return;
        }

        await user.save();

        res.status(200).json({ message: 'Vehicle deleted successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle.', error: (error as Error).message });
    }
});
