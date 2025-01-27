import {
  Drug,
  Pharmacy,
  HerbalTea,
  Fervex,
  MagicPill,
  Dafalgan,
} from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("should handle Herbal Tea correctly", () => {
    const pharmacy = new Pharmacy([new HerbalTea(5, 10)]);
    const result = pharmacy.updateBenefitValue();
    expect(result[0].benefit).toBe(11);
    expect(result[0].expiresIn).toBe(4);
  });

  it("should handle Fervex near expiration", () => {
    const pharmacy = new Pharmacy([new Fervex(5, 20)]);
    const result = pharmacy.updateBenefitValue();
    expect(result[0].benefit).toBe(23);
  });

  it("should not modify Magic Pill", () => {
    const pharmacy = new Pharmacy([new MagicPill(15, 40)]);
    const result = pharmacy.updateBenefitValue();
    expect(result[0].benefit).toBe(40);
    expect(result[0].expiresIn).toBe("No expiration");
  });

  it("should degrade Dafalgan faster", () => {
    const pharmacy = new Pharmacy([new Dafalgan(5, 10)]);
    const result = pharmacy.updateBenefitValue();
    expect(result[0].benefit).toBe(8);
  });
});
