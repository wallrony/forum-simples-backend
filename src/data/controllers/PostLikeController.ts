import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
  async delete(request: Request, response: Response) {
    const { user_id, post_id } = request.params;

    if(!user_id || !post_id) {
      return response.status(400).json({
        message: 'need req params'
      });
    }

    try {
      const alreadyLike = await connection('post_likes')
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id)
        .select('*')
        .first();
      
      if(alreadyLike) {
        const post = await connection('posts')
          .select('*')
          .where('id', '=', post_id)
          .first();

        const trx = await connection.transaction();

        const deletePostLike = await trx('post_likes') 
          .delete()
          .where({
            user_id, post_id
          });
        
        if(deletePostLike) {
          let finalResult;

          if(alreadyLike['liked']) {
            finalResult = await trx('posts')
              .update({
                likes: post['likes'] - 1
              })
              .where('id', '=', post_id);
          }
          else {
            finalResult = await trx('posts')
              .update({
                unlikes: post['unlikes'] - 1
              })
              .where('id', '=', post_id);
          }
  
          await trx.commit();
  
          if(finalResult) {
            return response.status(204).send();
          }
        }

        throw('delete-not-realized');
      }
      
      return response.status(404).send();
    }
    catch(error) {
      return response.status(500).json({error});
    }
  }
}