import certificates from "../data/certificates.json" with { type: "json" };
import { skillLevelName as getSkillLevelName } from "./helpers.js";
import { Category, Certificate } from "./types";

const load = (): Certificate[] => {
  console.log(certificates);

  return certificates.map((cert) => {
    return {
      ...cert,
      skillLevelName: getSkillLevelName(cert.skillLevel),
      mainCategory: cert.mainCategory as Category,
      adjacentCategory: cert.adjacentCategory.map((cat: string) => cat as Category)
    };
  });
};

export default load;