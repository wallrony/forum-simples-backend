import { Request, Response } from 'express';
import Post from '../../core/models/Post';
import { verifyMandatoryFields } from '../../core/utils/FieldUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'title, content'
];

export default {
  async index(request: Request, response: Response) {
    try {
      const result = await connection('posts')
        .join('post_likes', {'posts.id': 'post_likes.post_id'})
        .count({likes: 'post_likes.like'})
        .select({
          title: 'posts.title', 
          content: 'posts.content',
          likes: 'likes'
        });
      
      if(result) {
        return response.json(result);
      }

      throw('index-not-realized');
    }
    catch(error) {
      return response.status(500).send({error});
    }
  },
  async add(request: Request, response: Response) {
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

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} can't be empty`
      });
    }

    const post: Post = {
      ...request.body,
      user_id
    };

    try {
      const result = await connection('posts')
        .insert(post);
      
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
        message: 'need user_id param'
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

    const post: Post = {
      ...request.body,
      user_id
    };

    try {
      const result = await connection('posts')
        .update(post)
        .where('id', '=', post_id);
      
      if(result) {
        return response.send();
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
        message: 'need user_id param'
      });
    }

    try {
      const result = connection('posts')
        .delete()
        .where('id', '=', post_id);

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
