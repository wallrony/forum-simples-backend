import { Request, Response } from 'express';
import User from '../../core/models/User';
import { verifyMandatoryFields } from '../../core/utils/FieldUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'name', 'username'
];

export default {
  async add(request: Request, response: Response) {
    const emptyFields = verifyMandatoryFields(
      request.body, 
      mandatoryFields
    );

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} fields can't be empty`
      });
    }

    const user: User = request.body;

    try {
      const userExists = await connection('users')
        .select('id')
        .where('username', '=', user.username)
        .returning('id');
      
      if(userExists) {
        return response.status(400).json({
          message: 'username already in use'
        });
      }

      const result = await connection('users').insert(user).returning('id');

      if(result) {
        return response.status(201).json(result);
      }
      
      throw('add-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async show(request: Request, response: Response) {
    const { user_id } = request.params;

    if(!user_id) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    try {
      const result = await connection('users')
        .select('*')
        .where('id', '=', user_id);

      if(result) {
        return response.json(result);
      }

      throw('show-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async edit(request: Request, response: Response) {
    const { user_id } = request.params;

    if(!user_id) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(
      request.body, 
      mandatoryFields
    );

    if(emptyFields.length == mandatoryFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} fields can't be empty`
      });
    }

    const user: User = request.body;

    try {
      const userExists = await connection('users')
        .select('id')
        .where('username', '=', user.username)
        .returning('id');
      
      if(userExists) {
        return response.status(400).json({
          message: 'username already in use'
        });
      }
      
      const result = await connection('users')
        .update(user)
        .where('id', '=', user_id);

      if(result) {
        return response.json(result);
      }

      throw('update-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async delete(request: Request, response: Response) {
    const { user_id } = request.params;

    if(!user_id) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    try {
      const result = await connection('users')
        .delete()
        .where('id', '=', user_id);

      if(result) {
        return response.status(204).send();
      }

      throw('delete-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  }
}
