import { Request, Response } from 'express';
import PostLike from '../../core/models/PostLike';
import { verifyMandatoryFields } from '../../core/utils/FieldUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'like', 'user_id'
];

export default {
  async add(request: Request, response: Response) {
    const { post_id } = request.params;

    if(!post_id) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(
      request.body, 
      mandatoryFields
    );

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} can't be empty`
      });
    }

    const postLike: PostLike = {
      ...request.body,
      post_id
    };

    try {
      const result = await connection('post_likes')
        .insert(postLike);

      if(result) {
        return response.status(201).send();
      }

      throw('insert-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async edit(request: Request, response: Response) {
    const { user_id, post_id } = request.params;

    if(!user_id || !post_id) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(
      request.body, 
      mandatoryFields
    );

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} can't be empty`
      });
    }

    const postLike: PostLike = {
      like: request.body['like']
    };

    try {
      const result = await connection('post_likes')
        .update(postLike)
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id);

      if(result) {
        return response.status(200).send();
      }

      throw('update-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async delete(request: Request, response: Response) {
    const { user_id, post_id } = request.params;

    if(!user_id || !post_id) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    try {
      const result = await connection('post_likes')
        .delete()
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id);

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
