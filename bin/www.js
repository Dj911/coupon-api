import app from '../app.js'
import { config } from 'dotenv'
import logger from '../config/logger.js'
config()

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) logger.info('Cannot Listen to server. ERROR: ', err)
    logger.info(`Server is running ${process.env.PORT || 3000}`)
})

process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

export default app