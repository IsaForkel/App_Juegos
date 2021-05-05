import {Request, Response} from 'express';

import pool from '../database';

class GamesController{

        public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM games', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

        public async getOne (req: Request, res: Response){
            let sql = "SELECT * FROM games WHERE id = "+req.params.id
            await pool.query(sql, function(err, result, fields) {
                if (err) throw err;
                if (result.length > 0){
                    return res.json(result[0]);
                }else{
                    res.status(404).json('Juego No Encontrado');
                }
                
            });
        }

        public async create (req: Request, res: Response){
            await pool.query('INSERT INTO games (title, description, image) VALUES ('+'"'+req.body['title']+'","'+req.body['description']+'","'+req.body['image']+'")',function(err, result, fields) {
                if (err) throw err;
                res.json('Game Saved');
            });
        }

        public async delete (req: Request, res: Response){
            let sql = "DELETE FROM games WHERE id = "+req.params.id
            await pool.query(sql, function(err, result, fields) {
                if (err) throw err;
                res.json({message: "El juego fue eliminado"}) 
            });
        }

        public async update (req: Request, res: Response){
            await pool.query('UPDATE games SET title = '+'"'+req.body['title']+'"'+', description ='+'"'+req.body['description']+'"'+' , image = '+'"'+req.body['image']+'"'+'WHERE id =' + req.params.id,function(err, result, fields) {
                if (err) throw err;
                res.json('Juego Actualizado');
            });
        }
        
}

export const gamesController  = new GamesController();