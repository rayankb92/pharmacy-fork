const BENEFIT_MAX = 50;
const FERVEX_THRESHOLD_1 = 10;
const FERVEX_THRESHOLD_2 = 5;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit < BENEFIT_MAX ? benefit : BENEFIT_MAX;
  }

  updateExpirationDate() {
    this.expiresIn -= 1;
  }

  updateBenefitValue() {
    if (this.benefit > 0) this.benefit -= 1;
  }

  validateBenefit(value) {
    return Math.min(Math.max(value, 0), BENEFIT_MAX);
  }
}

export class HerbalTea extends Drug {
  constructor(expiresIn, benefit) {
    super("Herbal Tea", expiresIn, benefit);
  }

  updateBenefitValue() {
    const increaseValue = this.expiresIn < 0 ? 2 : 1;
    this.benefit = this.validateBenefit(this.benefit + increaseValue);
  }
}

export class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super("Fervex", expiresIn, benefit);
  }

  updateBenefitValue() {
    if (this.expiresIn < 0) {
      this.benefit = 0;
      return;
    }

    let increaseValue = 1;
    if (this.expiresIn <= FERVEX_THRESHOLD_2) {
      increaseValue = 3;
    } else if (this.expiresIn <= FERVEX_THRESHOLD_1) {
      increaseValue = 2;
    }

    this.benefit = this.validateBenefit(this.benefit + increaseValue);
  }
}

export class MagicPill extends Drug {
  constructor(expiresIn, benefit) {
    super("Magic Pill", expiresIn, benefit);
    this.expiresIn = "No expiration";
  }

  updateBenefitValue() {
    return;
  }

  updateExpirationDate() {
    return;
  }
}

export class Dafalgan extends Drug {
  constructor(expiresIn, benefit) {
    super("Dafalgan", expiresIn, benefit);
  }

  updateBenefitValue() {
    const decreaseValue = this.expiresIn < 0 ? 4 : 2;
    this.benefit = this.validateBenefit(this.benefit - decreaseValue);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].updateBenefitValue();
      this.drugs[i].updateExpirationDate();
    }
    return this.drugs;
  }
}
