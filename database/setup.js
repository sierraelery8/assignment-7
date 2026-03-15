require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// create a sequelize connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_NAME
});

// define the track model
const Track = sequelize.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
});

// async function to create a database and table
async function setupDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync();
        console.log("Tables created.");

    } catch (error) {
        console.error("Error setting up database:", error);
    } finally {
        await sequelize.close();
    }
}

setupDatabase();

module.exports = { sequelize, Track };
