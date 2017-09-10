import User from './models/user';

async function findOneAndUpdate(model) {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    referrer,
    photoUrl,
    role,
    token,
  } = model;

  const user = new User({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    referrer,
    photoUrl,
    role,
    token,
  });

  await user.collection.findOneAndUpdate(
    {
      email: model.email,
    },
    {
      $set: {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        referrer,
        photoUrl,
        role,
        token,
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
