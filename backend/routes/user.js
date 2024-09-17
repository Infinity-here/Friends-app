import { Router } from 'express';
import { getAllUsers, getUserById, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendsList } from '../controllers/usercontroller';
import { protect } from '../middleware/authmiddleware'; // Assuming you have JWT middleware

const router = Router();

//for getting all users
router.get('/', protect, getAllUsers);

//for getting a specific user by ID
router.get('/:id', protect, getUserById);

// Sending a friend request
router.post('/friend-request/:friendId', protect, sendFriendRequest);

// Accepting a friend request
router.post('/accept-friend/:friendId', protect, acceptFriendRequest);

// Rejecting a friend request
router.post('/reject-friend/:friendId', protect, rejectFriendRequest);

// Get friends list of the logged-in user
router.get('/friends', protect, getFriendsList);

export default router;
