import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://localhost:6379', 
  });

export class Pubsubmanager{
    private static instance: Pubsubmanager;

    private constructor {

    }

    static getInstance(){
        if(!Pubsubmanager.instance){
            Pubsubmanager.instance = new Pubsubmanager();
        }
        return Pubsubmanager.instance;
    }

    Subscribe(userId: string, stockName: string, message: string){

    }

    
    Unsubscribe(userId: string, stockName: string, message: string){
        
    }
}
