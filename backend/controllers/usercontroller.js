import { find, findById } from '../models/user';

// Fetch all users
export async function getAllUsers(req, res) {
  try {
    const users = await find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Fetch a specific user by ID
export async function getUserById(req, res) {
  try {
    const user = await findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Send a friend request
export async function sendFriendRequest(req, res) {
  try {
    const user = await findById(req.user.id); // assuming JWT for authentication
    const friend = await findById(req.params.friendId);

    if (!friend) return res.status(404).json({ message: 'User not found' });
    if (user.friendRequests.includes(friend.id)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    friend.friendRequests.push(user.id);
    await friend.save();

    res.status(200).json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Accept friend request
export async function acceptFriendRequest(req, res) {
  try {
    const user = await findById(req.user.id);
    const friend = await findById(req.params.friendId);

    if (!friend) return res.status(404).json({ message: 'User not found' });
    if (!user.friendRequests.includes(friend.id)) {
      return res.status(400).json({ message: 'No friend request from this user' });
    }

    // Remove from friendRequests and add to friends list
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friend.id.toString());
    user.friends.push(friend.id);
    friend.friends.push(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Reject friend request
export async function rejectFriendRequest(req, res) {
  try {
    const user = await findById(req.user.id);
    const friend = await findById(req.params.friendId);

    if (!friend) return res.status(404).json({ message: 'User not found' });
    if (!user.friendRequests.includes(friend.id)) {
      return res.status(400).json({ message: 'No friend request from this user' });
    }

    // Remove from friendRequests
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friend.id.toString());
    await user.save();

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// Get user's friend list
export async function getFriendsList(req, res) {
  try {
    const user = await findById(req.user.id).populate('friends', 'username email');
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}
