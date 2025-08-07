

import dotenv from 'dotenv';

import { App } from './app';
import { initializeDatabase } from './connection/database';
dotenv.config();
async function server(): Promise<void>{
    try{
        console.log('Initializing the database connection...');
        await initializeDatabase();
        //Create and start teh app
        const app = new App();
        const port = parseInt(process.env.PORT || '3000');
        //start server
        app.listen(port);
    }catch(error){
        console.error('Failed to start the application',error);
        process.exit(1)
    }
}
server();
