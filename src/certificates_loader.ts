import certificates from "../data/certificates.json" with { type: "json" };
import { Category, Certificate, SkillLevelName } from "./types";

const load = (): Certificate[] => {
  console.log(certificates);

  return certificates.map((cert) => {
    let skillLevelName: SkillLevelName;

    if (cert.skillLevel < 10) {
      skillLevelName = "beginner";
    } else if (cert.skillLevel < 19) {
      skillLevelName = "intermediate";
    } else {
      skillLevelName = "expert";
    }

    return {
      ...cert,
      skillLevelName: skillLevelName,
      mainCategory: cert.mainCategory as Category,
      adjacentCategory: cert.adjacentCategory.map((cat: string) => cat as Category)
    };
  });
};

export default load;