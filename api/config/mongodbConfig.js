const getConnectionString = () => {
    return process.env.MONGO_URI;
};

module.exports = getConnectionString;