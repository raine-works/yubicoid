import { parseArgs } from "@std/cli/parse-args";

const printHelp = (): void => {
  console.log(`Usage: greetme [OPTIONS...]`);
  console.log("\nOptional flags:");
  console.log("  -h, --help                Display this help and exit.");
  console.log(
    "  -s, --serial-number       Hexadecimal serial number. Example: 00:00:00:00:00:00:00.",
  );
};

export const main = (serialNumbers: string[]): string[] => {
  const uidToLittleEndianDecimal = (hexUid: string): string => {
    const allBytes = hexUid.split(":");
    const firstFour = allBytes.slice(0, 4);
    const reversed = firstFour.reverse();
    const hexString = reversed.join("");
    return parseInt(hexString, 16).toString();
  };

  const regex = new RegExp("^([0-9A-F]{2}:){6}[0-9A-F]{2}$");
  const endianDecimals: string[] = [];

  for (const serialNumber of serialNumbers) {
    if (regex.test(serialNumber)) {
      const endianDecimal = uidToLittleEndianDecimal(serialNumber);
      console.log(endianDecimal);
      endianDecimals.push(endianDecimal);
    } else {
      console.log(
        `Error: (${serialNumber}) Expected format: 00:00:00:00:00:00:00`,
      );
    }
  }
  return endianDecimals;
};

const args = parseArgs(Deno.args);

if (args.h || args.help) {
  printHelp();
  Deno.exit(0);
}

if (
  args._.length < 1 && !args.h && !args.help && !args.s &&
  !args["serial-number"]
) {
  printHelp();
  Deno.exit(0);
}

const serialNumbers =
  ((args.s || args["serial-number"] || args._).split(",") as string[]).filter((
    n,
  ) => n);

main(serialNumbers);
