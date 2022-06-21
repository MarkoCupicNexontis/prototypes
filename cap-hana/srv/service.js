const cds = require("@sap/cds");

module.exports = function () {

    this.on("up", async (req) => {

        const func = await cds.connect.to('FunctionService')
        const { Functions } = func.entities;

        let selectedRowID = req.params[0].ID;
        let functionsByID = await cds.run(SELECT`ID, sequence`.from(Functions).where`ID=${selectedRowID}`);

        if (functionsByID[0].sequence > 1) {

            let indexAbove = (functionsByID[0].sequence - 1);
            let functionsBySequence = await cds.run(SELECT`ID`.from(Functions).where`sequence=${indexAbove}`);

            let aboveRowID = functionsBySequence[0].ID;
            let functionsAboveRowByID = await cds.run(SELECT`ID, sequence`.from(Functions).where`ID=${aboveRowID}`);

            let aboveRowSequenceIncrement = (functionsAboveRowByID[0].sequence + 1);
            let selectedRowDecrement = (functionsByID[0].sequence - 1);

            await cds.run(UPDATE(Functions).set`sequence=${aboveRowSequenceIncrement}`.where`ID=${aboveRowID}`);

            await cds.run(UPDATE(Functions).set`sequence=${selectedRowDecrement}`.where`ID=${selectedRowID}`);
        }

        let allFunctions = await cds.run(SELECT`*`.from(Functions));

        return allFunctions;

    });

    this.on("down", async (req) => {

        const func = await cds.connect.to('FunctionService')
        const { Functions } = func.entities;

        let selectedRowID = req.params[0].ID;
        let functionsByID = await cds.run(SELECT`ID, sequence`.from(Functions).where`ID=${selectedRowID}`);

        let functionsAllSequence = await cds.run(SELECT`sequence`.from(Functions));

        if (functionsByID[0].sequence < functionsAllSequence.length) {

            let indexBelow = (functionsByID[0].sequence + 1);
            let functionsBySequence = await cds.run(SELECT`ID`.from(Functions).where`sequence=${indexBelow}`);

            let belowRowID = functionsBySequence[0].ID;
            let functionsBelowRowByID = await cds.run(SELECT`ID, sequence`.from(Functions).where`ID=${belowRowID}`);

            let belowRowSequenceDecrement = (functionsBelowRowByID[0].sequence - 1);
            let selectedRowIncrement = (functionsByID[0].sequence + 1);

            await cds.run(UPDATE(Functions).set`sequence=${belowRowSequenceDecrement}`.where`ID=${belowRowID}`);

            await cds.run(UPDATE(Functions).set`sequence=${selectedRowIncrement}`.where`ID=${selectedRowID}`);
        }

        let allFunctions = await cds.run(SELECT`*`.from(Functions));

        return allFunctions;

    });

    this.on('DELETE', 'Functions', async (req) => {

        const func = await cds.connect.to('FunctionService')
        const { Functions } = func.entities;

        let selectedRowID = req.params[0].ID;
        let functionsByID = await cds.run(SELECT`ID, sequence`.from(Functions).where`ID=${selectedRowID}`);

        let functionsAllSequence = await cds.run(SELECT`sequence`.from(Functions));

        let nextIndex = (functionsByID[0].sequence + 1)

        await cds.run(DELETE.from(Functions).where`ID=${selectedRowID}`);

        if (nextIndex <= functionsAllSequence.length) {
            for (let i = nextIndex; i <= functionsAllSequence.length; i++) {
                let functionsForUpdate = await cds.run(SELECT`ID, sequence`.from(Functions).where`sequence=${i}`);
                await cds.run(UPDATE(Functions).set`sequence=${functionsForUpdate[0].sequence - 1}`.where`ID=${functionsForUpdate[0].ID}`);
            }
        }

    });

    this.after('CREATE', 'Functions', async (req) => {
        const func = await cds.connect.to('FunctionService')
        const { Functions } = func.entities;

        let allFunctions = await cds.run(SELECT`ID, sequence`.from(Functions));
        let lastIndex = (allFunctions.length - 1);
        let firstIndex = ((allFunctions.length - lastIndex) - 1);

        let lastFuncSequence = await cds.run(SELECT`ID, sequence`.from(Functions).where`sequence=${allFunctions[lastIndex].sequence}`);

        await cds.run(UPDATE(Functions).set`sequence=${lastFuncSequence[0].sequence + 1}`.where`ID=${allFunctions[firstIndex].ID}`);

    });

};
