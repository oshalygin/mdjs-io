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
