import User from '../models/User';

class UserController {
  async store(req, res) {
    const emailExist = await User.findOne({ where: { email: req.body.email } });

    if (emailExist) {
      return res.json({ error: 'User Already exist' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });

  }

  async index(req, res) {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id }, attributes: ['id', 'name', 'email'] });
    
    if (!user) {
      return res.json({ error: 'User not Found' });
    }

    return res.json(user);

  }

  async update(req, res) {
    const { id } = req.params;
    
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(id);
  
    if (!user) {
      return res.json({ error: 'User not Exist' });
    }

    if ( email !== user.email) {
      const emailExist = await User.findOne({ where: { email: req.body.email } });

      if (emailExist) {
        return res.json({ error: 'Email Already exist' });
      }
    }

    if (!(await user.checkPassword(oldPassword))) {
      return res.json({ error: 'Password does not match' });
    }

    const { name } = await user.update(req.body);

    return res.json({ id, name, email });

  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.json({ error: 'User not Exist' });
    }

    await User.destroy({ where: { id: id } });

    return res.json({ success: 'User deleted successfully' });

  }

}

export default new UserController();