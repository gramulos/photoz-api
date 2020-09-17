import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    rehashedPassword: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function callback(next) {
  if (this.rehashedPassword) {
    this.rehashedPassword = await bcrypt.hash(
      this.rehashedPassword,
      parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10),
    );
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

const save = async model => new UserModel(model).save();

const getUserByName = async username => UserModel.findOne({ username });

const getUserByEmail = async email => UserModel.findOne({ email });

const comparePassword = async ({ userPassword, rehashedPassword }) =>
  bcrypt.compare(userPassword, rehashedPassword);

UserModel.schema
  .path('username')
  .validate(async username => !(await getUserByName(username)), 'User already exists!');

UserModel.schema
  .path('email')
  .validate(async email => !(await getUserByEmail(email)), 'User already exists!');

export { save, getUserByName, getUserByEmail, comparePassword, userSchema };
