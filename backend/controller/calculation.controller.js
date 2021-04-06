var path = require('path');
var fs = require('fs');
const REPLACEMENT_VARS = {
    // key : value
    // parameter name of file : property name of req body to ge value from.
    REQ: 'lenseType',
    JOB: 'jobNumber',
    LNAM: 'lNam',
    LDNAM: 'ldNam',
    CORRLEN: 'canalLength',
    LTYP: 'lense',
    SPH: 'sph',
    CYL: 'cyl',
    AX: 'ax',
    ADD: 'add',
    PRVM: 'prvm',
    PRVA: 'prva',
    MINCTR: 'minCtr',
    MINEDGE: 'minEdge', // 1
    CRIB: 'crib',   // 65
    DIA: 'dia',     // 75
    FRNT: 'frnt',
    LIND: 'lind',   // 1.5
    FGD: 'fgd'
}
var inputData = '';

exports.CALCULATIONS = (req, res) => {
    //console.log(' path **** ', req.session);
    try {
        var filePath = path.join(__dirname, process.env.IMPORT_FILE_PATH);
        var calculationData = req.body;
        var fileExtension = process.env.IMPORT_FILE_EXTENSION;
        var fileName = new Date().toISOString() + fileExtension;

        // console.log(' filePath ** ', filePath);
        // console.log(' fileName ** ', fileName);
        // console.log(' calculationData ', calculationData);

        // Create If Directory does not exists.
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }

        var newFile = fs.createWriteStream(filePath + fileName);
        initiateData();
        let dataToWrite = getInputData(calculationData);
        newFile.write(dataToWrite);
        return res.send("success");
    } catch (error) {
        return res.status(500).send({"Error": error});
    }
}

initiateData = () => {
    let { REQ, JOB, LNAM, LDNAM, CORRLEN, LTYP, SPH, CYL, AX, ADD,
        PRVM, PRVA, MINCTR, MINEDGE, CRIB, DIA, FRNT, LIND, FGD } = REPLACEMENT_VARS;
    inputData = `REQ=LDS\nDO={${REQ}}\nJOB={${JOB}}\nLNAM={${LNAM}}\nLDNAM={${LDNAM}}\nCORRLEN={${CORRLEN}}\nLTYP={${LTYP}}\nSPH={${SPH}}
CYL={${CYL}}\nAX={${AX}}\nADD={${ADD}}\nPRVM={${PRVM}}\nPRVA={${PRVA}}\nMINCTR={${MINCTR}}\nMINEDGE={${MINEDGE}}\nCRIB={${CRIB}}
DIA={${DIA}}\nFRNT={${FRNT}}\nLIND={${LIND}}\nFGD={${FGD}}`;
}

getInputData = (calculationData) => {

    let type;
    if (calculationData[REPLACEMENT_VARS.REQ]) {
        switch (calculationData[REPLACEMENT_VARS.REQ].toUpperCase()) {
            case 'BOTH':
                type = 'B';
                break;
            case 'LEFT':
                type = 'L';
                break;
            case 'RIGHT':
                type = 'R';
                break;
            default:
                type = null;
                break;
        }
        inputData = replaceValue(REPLACEMENT_VARS.REQ, type);
    }
    // key=right;left
    if (type == 'L') {
        inputData = arrangeLenseValue(false, true, false, calculationData);
    } else if (type == 'R') {
        inputData = arrangeLenseValue(true, false, false, calculationData);
    } else if (type == 'B') {
        inputData = arrangeLenseValue(false, false, true, calculationData);
    }
    return inputData;
}

replaceValue = (variable, value) => {
    return inputData.replace('{' + variable + '}', value);
}

arrangeLenseValue = (onlyRight, onlyLeft, Both, data) => {
    // PROGRESSIVE, SINGLE_VERSION OR ASPHERIC
    let lense;
    let { rightLense, leftLense } = data;
    let right_data = calculateDynamicValue(rightLense);
    let left_data = calculateDynamicValue(leftLense);

    switch (data[REPLACEMENT_VARS.LTYP]) {
        case 'PROGRESSIVE':
            lense = 'PR';
            break;
        case 'SINGLE_VISION':
            lense = 'SV';
            break;
        case 'ASPHERIC':
            lense = 'AS';
            break;
        default:
            lense = '';
            break;
    }
    if (!Both) {
        // LNAM
        let lNamValue = onlyRight ? 'ID;' : ';ID'
        inputData = replaceValue(REPLACEMENT_VARS.LNAM, lNamValue)

        // LDNAM
        let ldNamValue = onlyRight ? 'ID;' : ';ID'
        inputData = replaceValue(REPLACEMENT_VARS.LDNAM, ldNamValue);

        // CORRLEN
        if (data[REPLACEMENT_VARS.CORRLEN]) {
            let value = data[REPLACEMENT_VARS.CORRLEN];
            let corrLen = onlyRight ? value + ';' : ';' + value;
            inputData = replaceValue(REPLACEMENT_VARS.CORRLEN, corrLen);
        }
        // LTYPE
        let lenseValue = onlyRight ? lense + ';' : ';' + lense;
        inputData = replaceValue(REPLACEMENT_VARS.LTYP, lenseValue);

        // SPH
        let sphValue = onlyRight ? right_data[REPLACEMENT_VARS.SPH] + ';' : ';' + left_data[REPLACEMENT_VARS.SPH];
        inputData = replaceValue(REPLACEMENT_VARS.SPH, sphValue);

        // CYL
        let cylValue = onlyRight ? right_data[REPLACEMENT_VARS.CYL] + ';' : ';' + left_data[REPLACEMENT_VARS.CYL];
        inputData = replaceValue(REPLACEMENT_VARS.CYL, cylValue);

        // AX
        let axValue = onlyRight ? right_data[REPLACEMENT_VARS.AX] + ';' : ';' + left_data[REPLACEMENT_VARS.AX];
        inputData = replaceValue(REPLACEMENT_VARS.AX, axValue);

        // ADD
        let addValue = onlyRight ? right_data[REPLACEMENT_VARS.ADD] + ';' : ';' + left_data[REPLACEMENT_VARS.ADD];
        inputData = replaceValue(REPLACEMENT_VARS.ADD, addValue);

        // PRVM
        let prvmValue = onlyRight ? right_data[REPLACEMENT_VARS.PRVM] + ';' : ';' + left_data[REPLACEMENT_VARS.PRVM];
        inputData = replaceValue(REPLACEMENT_VARS.PRVM, prvmValue);

        // PRVA
        let prvaValue = onlyRight ? right_data[REPLACEMENT_VARS.PRVA] + ';' : ';' + left_data[REPLACEMENT_VARS.PRVA];
        inputData = replaceValue(REPLACEMENT_VARS.PRVA, prvaValue);

        // MINCTR
        let minCtrValue = onlyRight ? right_data[REPLACEMENT_VARS.MINCTR] + ';' : ';' + left_data[REPLACEMENT_VARS.MINCTR];
        inputData = replaceValue(REPLACEMENT_VARS.MINCTR, minCtrValue);

        // MINEDGE
        let minEdgeValue = onlyRight ? '1;' : ';1';
        inputData = replaceValue(REPLACEMENT_VARS.MINEDGE, minEdgeValue);

        // CRIB
        let cribValue = onlyRight ? '65;' : ';65';
        inputData = replaceValue(REPLACEMENT_VARS.CRIB, cribValue);

        // DIA
        let diaValue = onlyRight ? '75;' : ';75';
        inputData = replaceValue(REPLACEMENT_VARS.DIA, diaValue);

        // FRNT
        let frntValue = onlyRight ? right_data[REPLACEMENT_VARS.FRNT] + ';' : ';' + left_data[REPLACEMENT_VARS.FRNT];
        inputData = replaceValue(REPLACEMENT_VARS.FRNT, frntValue);

        // LIND
        let lindValue = onlyRight ? '1.5;' : ';1.5';
        inputData = replaceValue(REPLACEMENT_VARS.LIND, lindValue);

        // FGD
        let fgdValue = onlyRight ? right_data[REPLACEMENT_VARS.FGD] + ';' : ';' + left_data[REPLACEMENT_VARS.FGD];
        inputData = replaceValue(REPLACEMENT_VARS.FGD, fgdValue);

    } else {
        // BOTH LENSE
        inputData = replaceValue(REPLACEMENT_VARS.LNAM, 'ID:ID');
        inputData = replaceValue(REPLACEMENT_VARS.LDNAM, 'SD;SD');
        inputData = replaceValue(REPLACEMENT_VARS.CORRLEN, data[REPLACEMENT_VARS.CORRLEN] + ';' + data[REPLACEMENT_VARS.CORRLEN]);
        inputData = replaceValue(REPLACEMENT_VARS.LTYP, lense + ';' + lense);
        inputData = replaceValue(REPLACEMENT_VARS.SPH, right_data[REPLACEMENT_VARS.SPH] + ';' + left_data[REPLACEMENT_VARS.SPH]);
        inputData = replaceValue(REPLACEMENT_VARS.CYL, right_data[REPLACEMENT_VARS.CYL] + ';' + left_data[REPLACEMENT_VARS.CYL]);
        inputData = replaceValue(REPLACEMENT_VARS.AX, right_data[REPLACEMENT_VARS.AX] + ';' + left_data[REPLACEMENT_VARS.AX]);
        inputData = replaceValue(REPLACEMENT_VARS.ADD, right_data[REPLACEMENT_VARS.ADD] + ';' + left_data[REPLACEMENT_VARS.ADD]);
        inputData = replaceValue(REPLACEMENT_VARS.PRVM, right_data[REPLACEMENT_VARS.PRVM] + ';' + left_data[REPLACEMENT_VARS.PRVM]);
        inputData = replaceValue(REPLACEMENT_VARS.PRVA, right_data[REPLACEMENT_VARS.PRVA] + ';' + left_data[REPLACEMENT_VARS.PRVA]);
        inputData = replaceValue(REPLACEMENT_VARS.MINCTR, right_data[REPLACEMENT_VARS.MINCTR] + ';' + left_data[REPLACEMENT_VARS.MINCTR]);
        inputData = replaceValue(REPLACEMENT_VARS.MINEDGE, '1;1');
        inputData = replaceValue(REPLACEMENT_VARS.CRIB, '65;65');
        inputData = replaceValue(REPLACEMENT_VARS.DIA, '75;75');
        inputData = replaceValue(REPLACEMENT_VARS.FRNT, right_data[REPLACEMENT_VARS.FRNT] + ';' + left_data[REPLACEMENT_VARS.FRNT]);
        inputData = replaceValue(REPLACEMENT_VARS.LIND, '1.5;1.5');
        inputData = replaceValue(REPLACEMENT_VARS.FGD, right_data[REPLACEMENT_VARS.FGD] + ';' + left_data[REPLACEMENT_VARS.FGD]);

    }

    return inputData;
}

calculateDynamicValue = (data) => {
    if (!data) {
        return null;
    }
    let meanPower;
    let _SPH = data[REPLACEMENT_VARS.SPH];
    let _CYL = data[REPLACEMENT_VARS.CYL];
    if (data[REPLACEMENT_VARS.CYL] > 0) {
        data[REPLACEMENT_VARS.SPH] = _SPH + _CYL;
        _SPH = data[REPLACEMENT_VARS.SPH];
        data[REPLACEMENT_VARS.CYL] = _CYL * (-1);
        _CYL = data[REPLACEMENT_VARS.CYL];
        data[REPLACEMENT_VARS.AX] = data[REPLACEMENT_VARS.AX] + 90;
    };

    // Minimal Center Thikness
    meanPower = _SPH + (0.5 * _CYL);
    if (meanPower < 0) {
        data[REPLACEMENT_VARS.MINCTR] = 2;
    } else if (meanPower > 0 && _SPH < 0) {
        data[REPLACEMENT_VARS.MINCTR] = 3;
    } else if (meanPower > 0) {
        if (_SPH >= 0 && _SPH <= 3) {
            data[REPLACEMENT_VARS.MINCTR] = 4;
        } else if (_SPH > 3 && _SPH <= 5) {
            data[REPLACEMENT_VARS.MINCTR] = 6;
        } else if (_SPH > 5) {
            data[REPLACEMENT_VARS.MINCTR] = 8;
        }
    }

    // Calculation of Front Curve
    if (meanPower < 0) {
        if (_SPH >= -8 && _SPH <= -6) {
            data[REPLACEMENT_VARS.FRNT] = 1
        } else if (_SPH > -6 && _SPH <= -4) {
            data[REPLACEMENT_VARS.FRNT] = 2;
        } else if (_SPH > -4 && _SPH <= 0) {
            data[REPLACEMENT_VARS.FRNT] = 4;
        }
    } else if (meanPower > 0) {
        if (_SPH < 0) {
            data[REPLACEMENT_VARS.FRNT] = 5;
        } else if (_SPH > 0) {
            data[REPLACEMENT_VARS.FRNT] = Math.min((_SPH - 1), 6);
        }
    }

    // Calculate FGD

    if (meanPower <= 0) {
        data[REPLACEMENT_VARS.FGD] = 0
    } else if (meanPower > 0) {
        data[REPLACEMENT_VARS.FGD] = 8
    }
    return data;
}