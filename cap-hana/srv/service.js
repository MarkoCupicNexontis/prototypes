const cds = require("@sap/cds");

module.exports = function () {

    this.on("increase", async () => {
        const userCount = await cds.run(SELECT`count`.from`User_Count`.where`ID=1`)
        const incrementUserCount = (userCount[0].count + 1)

        await cds.run(UPDATE`User_Count`.set`count=${incrementUserCount}`.where`ID=1`)
    });

    this.on("decrease", async () => {
        let userCount = await cds.run(SELECT`count`.from`User_Count`.where`ID=1`)
        if (userCount[0].count > 0) {
            const decrementUserCount = (userCount[0].count - 1)

            await cds.run(UPDATE`User_Count`.set`count=${decrementUserCount}`.where`ID=1`)
        }
    });

    this.on("resetCounter", async () => {
        let userCount = await cds.run(SELECT`count`.from`User_Count`.where`ID=1`)
        if (userCount[0].count > 0) {
            await cds.run(UPDATE`User_Count`.set`count=${0}`.where`ID=1`)
        }
    });

    this.on("counterRefresh", async () => {
        let userCount = await cds.run(SELECT`count`.from`User_Count`.where`ID=1`)
        return userCount;
    });

};