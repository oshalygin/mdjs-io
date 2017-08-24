import User from './models/user';

async function findOneAndUpdate(username, password) {
  const user = new User({
    username,
    password,
  });

  await user.collection.findOneAndUpdate(
    {
      username,
    },
    {
      $set: {
        username,
        password,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
}

export default {
  findOneAndUpdate,
};
