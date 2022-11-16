const entityTypeSet = new Set([
    "LP",
    "LL",
    "FC",
    "PF",
    "RF",
    "MQ",
    "MM",
    "NB",
    "CC",
    "CS",
    "MB",
    "FM",
    "GS",
    "DP",
    "CP",
    "NR",
    "CM",
    "CD",
    "MD",
    "HS",
    "VH",
    "CH",
    "MH",
    "CL",
    "XL",
    "CX",
    "HC",
    "RP",
    "TU",
    "TC",
    "FB",
    "FN",
    "PA",
    "PB",
    "SS",
    "MC",
    "SM",
    "GA",
    "GB",
]);

const checkValidYear: (x: number) => boolean = (year) => {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    if (year > currYear) {
        return false;
    } else {
        return true;
    }
};

export const checkUEN: (x: string) => string = (uen) => {
    if (uen.length < 9) {
        return "Length of UEN too short";
    } else if (uen.length > 10) {
        return "Length of UEN too long";
    }

    if (uen.toUpperCase() !== uen) {
        return "UEN needs to be all uppercase";
    }

    // uen = uen.toUpperCase();
    uen = uen.trim();

    // (A) Businesses registered with ACRA nnnnnnnnX
    if (uen.length == 9) {
        if (!isNaN(uen[8] as any)) {
            return "(A) Check letter should not be a number";
        }
        for (let i = 0; i < 8; i++) {
            if (isNaN(uen[i] as any)) {
                return "(A) Businesses registered with ACRA UEN should start with 8 numbers";
            }
        }
    } else {
        if (!isNaN(uen[9] as any)) {
            return "(B) (C) Check letter should not be a number";
        }

        if (isNaN(uen[0] as any)) {
            // (C)
            if (uen[0] !== "T" && uen[0] !== "S" && uen[0] !== "R") {
                return "(C) First letter is incorrect";
            }
            // Check if next 2 letters are numbers for the year
            if (isNaN(uen[1] as any) || isNaN(uen[2] as any)) {
                return "(C) Second or Third letter should be a number";
            }

            // Check if is valid year
            let year = 0;
            if (uen[0] === "T") {
                year += 2000;
            } else if (uen[0] === "S") {
                year += 1900;
            } else {
                year += 1800;
            }

            year += parseInt(uen.slice(1, 3) as any);
            if (!checkValidYear(year)) {
                return "(C) Year not valid";
            }

            // Check if valid entity
            if (!entityTypeSet.has(uen.slice(3, 5))) {
                return "(C) Entity Type not valid";
            }

            // Check if next 4 are numbers
            for (let i = 5; i < 9; i++) {
                if (isNaN(uen[i] as any)) {
                    return "(C) UEN should have 4 numbers after the entity type";
                }
            }
        } else {
            // Check year
            for (let i = 0; i < 4; i++) {
                if (isNaN(uen[i] as any)) {
                    return "(B) Year should not have any numbers";
                }
            }

            const year = parseInt(uen.slice(0, 4));
            console.log(year);
            if (!checkValidYear(year)) {
                return "(B) Year not valid";
            }

            // Check if next 5 are numbers
            for (let i = 4; i < 9; i++) {
                if (isNaN(uen[i] as any)) {
                    return "(C) UEN should have 5 numbers after the year";
                }
            }
        }
    }

    return "Valid UEN";
};
