import { Injectable } from '@angular/core';

@Injectable()
export class RegularService {
    Int_regular: any;
    Float_regular: any;
    Sn_regular: any;
    Strong_regular: any;

    constructor() {
        this.Int_regular = /^[0-9]*$/;
        this.Float_regular = /^[0-9.]*$/;
        this.Sn_regular = /^[0-9a-zA-Z\W]+$/;
        this.Strong_regular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    };

    isInt(value) {
        return this.Int_regular.test(value);
    }

    isFloat(value) {
        return this.Float_regular.test(value);
    }

    isBlank(value) {
        if (value === null || value === '') {
            return true;
        }
        return false;
    }

    isSn(value) {
        return this.Sn_regular.test(value);
    }

    isStrong(value) {
        return this.Strong_regular.test(value);
    }
}
