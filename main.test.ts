import { assertEquals } from "@std/assert";
import { convertHexToDecimal } from "./tools.ts";

Deno.test(() => {
  const output = convertHexToDecimal(["27:99:32:B8:01:32:99"]);
  console.log(output);
  assertEquals(output, ["3090323751"]);
  Deno.exit(0);
});
