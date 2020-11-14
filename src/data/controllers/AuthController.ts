import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
  async login(request: Request, response: Response) {
    const { username } = request.body;

    if(!username) {
      return response.status(400).json({
        message: 'need username'
      });
    }

    try {
      const result = await connection('users')
        .select('*')
        .where('username', '=', username)
        .first();

      if(result) {
        return response.json(result);
      }

      return response.status(404).json({
        message: 'not found'
      });
    }
    catch(error) {
      return response.status(500).json({error});
    }
  }
}