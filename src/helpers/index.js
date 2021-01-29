import { GiLunarModule } from "react-icons/gi";

const truncateString = (string, nb) => {
  if (string.length > nb) {
    return `${string.substr(0, nb)} ...`;
  }
  return string;
};

export {
  truncateString,
};
