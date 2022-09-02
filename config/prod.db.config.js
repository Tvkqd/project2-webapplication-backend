module.exports = {
    HOST: 'project2.eaglesoftwareteam.com',
    port: 3001,
    USER: 't12022',
    PASSWORD: 'cs@oc2022t1',
    DB: 'p2-t1-2022',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};