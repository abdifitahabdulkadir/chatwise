import { PlaceholdersAndVanishInput } from "./ui/PlaceholderVanisInput";
const placeholders = [
  "What's the secret ingredient in your favorite dish?",
  "Who would you invite to your dream dinner party?",
  "Where would you time travel if you had one chance?",
  "Describe a coding challenge you recently solved.",
  "How would you design your ultimate workspace?",
];

export default function GenerateChat({
  hanldeOnChnage,
  handleSubmit,
  disable,
}: {
  input: string;
  hanldeOnChnage: any;
  handleSubmit: any;
  disable: boolean | undefined;
}) {
  return (
    <PlaceholdersAndVanishInput
      disable={disable}
      placeholders={placeholders}
      onChange={hanldeOnChnage}
      onSubmit={handleSubmit}
    />
  );
}
