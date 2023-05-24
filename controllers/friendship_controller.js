const user = require('../models/user');
const friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.friendship = async function (req, res) {
    try {
        console.log(' i m here in frienship');
        let from_user = await User.findById(req.user._id);
        let to_user = await User.findById(req.query.to);
        let deleted = false;
        console.log(from_user);
        console.log(to_user);
        let existingFriend = await friendship.findOne({
            from_user: req.user._id,
            to_user: req.query.to
        });

        if (existingFriend) {
            to_user.friendships.pull(existingFriend._id);
            from_user.friendships.pull(existingFriend._id);
            to_user.save();
            from_user.save();
            existingFriend.deleteOne();

            deleted = true;
        } else {
            let newFriendship = await friendship.create({
                from_user: from_user,
                to_user: to_user
            });
            to_user.friendships.push(newFriendship);
            from_user.friendships.push(newFriendship);
            to_user.save();
            from_user.save();
        }
        return res.status(200).json({
            message: 'friendship is created successfully',
            data: deleted
        })


    } catch (error) {
        console.log('Error*******', error);
        return res.status(500).json({
            message: 'Internal server error'
        })

    }

}

module.exports.friendshipDestroy = async function (req, res) {
    try {
        const to_user = await User.findById(req.query.to);
        const from_user = await User.findById(req.user._id);

        const existingFriend = await friendship.findOne({
            from_user: req.user._id,
            to_user: req.query.to
        });

        to_user.friendships.pull(existingFriend._id);
        from_user.friendships.pull(existingFriend._id);
        to_user.save();
        from_user.save();
        existingFriend.deleteOne

    } catch (error) {
        console.log('Error*******', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

}