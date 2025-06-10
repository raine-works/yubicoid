import { parseArgs } from "@std/cli/parse-args";
import { convertHexToDecimal } from "./tools.ts";

const printHelp = (): void => {
  console.log(`Usage: greetme [OPTIONS...]`);
  console.log("\nOptional flags:");
  console.log("  -h, --help                Display this help and exit.");
  console.log(
    "  -s, --serial-number       Hexadecimal serial number. Example: 00:00:00:00:00:00:00.",
  );
};

const main = () => {
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
    ((args.s || args["serial-number"] || args._).split(",") as string[]).filter(
      (
        n,
      ) => n,
    );

  convertHexToDecimal(serialNumbers);
};

main();
