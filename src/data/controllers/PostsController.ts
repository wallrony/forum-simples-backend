import { Request, Response } from 'express';
import Post from '../../core/models/Post';
import { verifyMandatoryFields } from '../../core/utils/FieldUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'title', 'content'
];

export default {
  async index(request: Request, response: Response) {
    try {
      const result = await connection('posts')
        .select('id', 'title', 'likes', 'unlikes')

      if(result) {
        return response.json(result);
      }

      throw('index-not-realized');
    }
    catch(error) {
      console.log("error", error)
      return response.status(500).send({error});
    }
  },
  async add(request: Request, response: Response) {
    const { user_id } = request.params;

    if(!user_id) {
      return response.status(400).json({
        message: 'need req params'
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
        .insert(post)
        .returning('*');
      
      if(result[0]) {
        return response.status(201).json(result[0]);
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
        message: 'need req params'
      });
    }

    const emptyFields = verifyMandatoryFields(
      request.body,
      mandatoryFields
    );

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(' or ')} can't be empty`
      });
    }

    const post: Post = {
      ...request.body,
      user_id
    };

    try {
      const result = await connection('posts')
        .update(post)
        .where('id', '=', post_id)
        .returning('*');
      if(result[0]) {
        return response.json(result[0]);
      }
      
      return response.status(404).json({
        message: 'not found'
      });
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async like(request: Request, response: Response) {
    const { user_id, post_id } = request.params;

    if(!user_id || !post_id) {
      return response.status(400).json({
        message: 'need req params'
      });
    }

    try {
      const post = await connection('posts')
        .select('unlikes', 'likes')
        .where('id', '=', post_id)
        .first();

      if(!post) return response.status(404).json();
      
      const user = await connection('users')
        .select('*')
        .where('id', '=', user_id)
        .first();
      
      if(!user) return response.status(404).json();

      const alreadyLike = await connection('post_likes')
        .where('post_id', '=', post_id)
        .andWhere('user_id', '=', user_id)
        .select('*')
        .first();

      let resultLikePost;

      const trx = await connection.transaction();

      if(alreadyLike) {
        if(alreadyLike['liked']) return response.status(400).json({
          message: 'already liked'
        });
        
        resultLikePost = await trx('posts')
          .update({
            unlikes: Number(post['unlikes']) - 1,
            likes: Number(post['likes']) + 1
          })
          .where('id', '=', post_id)
          .returning('*');
      }
      else {
        resultLikePost = await trx('posts')
          .update({
            likes: Number(post['likes']) + 1
          })
          .where('id', '=', post_id)
          .returning('*');
      }
      
      if(resultLikePost[0]) {
        let finalResult;

        if(!alreadyLike) {
          finalResult = await trx('post_likes')
            .insert({
              user_id,
              post_id,
              liked: true
            })
            .returning('*');
        }
        else {
          finalResult = await trx('post_likes')
            .update({
              liked: true
            })
            .where('user_id', '=', user_id)
            .andWhere('post_id', '=', post_id)
            .returning('*');
        }

        await trx.commit();
            
        if(finalResult[0]) {
          return response.status(201).send();
        }
      }

      await trx.commit();

      return response.send();
    }
    catch(error) {
      return response.status(500).json({error});
    }
  },
  async unlike(request: Request, response: Response) {
    const { user_id, post_id } = request.params;

    if(!user_id || !post_id) {
      return response.status(400).json({
        message: 'need req params'
      });
    }

    try {
      const post = await connection('posts')
        .select('unlikes', 'likes')
        .where('id', '=', post_id)
        .first();

      if(!post) return response.status(404).json();
      
      const user = await connection('users')
        .select('*')
        .where('id', '=', user_id)
        .first();
      
      if(!user) return response.status(404).json();

      const alreadyLike = await connection('post_likes')
        .where('post_id', '=', post_id)
        .andWhere('user_id', '=', user_id)
        .select('*')
        .first();

      let resultLikePost;

      const trx = await connection.transaction();

      if(alreadyLike) {
        if(!alreadyLike['liked']) return response.status(400).json({
          message: 'already unliked'
        });

        resultLikePost = await trx('posts')
          .update({
            unlikes: Number(post['unlikes']) + 1,
            likes: Number(post['likes']) - 1
          })
          .where('id', '=', post_id)
          .returning('*');
      }
      else {
        resultLikePost = await trx('posts')
          .update({
            unlikes: Number(post['unlikes']) + 1
          })
          .where('id', '=', post_id)
          .returning('*');
      }
      
      if(resultLikePost[0]) {
        let finalResult;
        let code = 201;

        if(!alreadyLike) {
          finalResult = await trx('post_likes')
            .insert({
              user_id,
              post_id,
              liked: false
            })
            .returning('*');
          
          code = 200;
        }
        else {
          finalResult = await trx('post_likes')
            .update({
              liked: false
            })
            .where('user_id', '=', user_id)
            .andWhere('post_id', '=', post_id)
            .returning('*');
        }

        await trx.commit();
            
        if(finalResult[0]) {
          return response.status(code).send();
        }
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
        message: 'need req params'
      });
    }

    try {
      const trx = await connection.transaction();

      const resultDeletePostLikes = await trx('post_likes')
        .delete()
        .where('post_id', '=', post_id);

      const result = await trx('posts')
        .delete()
        .where('id', '=', post_id);

      await trx.commit();

      if(resultDeletePostLikes && result) {
        return response.status(204).send();
      }
      else if(resultDeletePostLikes === 0 || result === 0) {
        return response.status(404).json({
          message: 'not found'
        });
      }

      throw('delete-not-realized');
    }
    catch(error) {
      return response.status(500).json({error});
    }
  }
}
