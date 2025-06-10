import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test(() => {
  const output = main(["27:99:32:B8:01:32:99"]);
  console.log(output);
  assertEquals(output, ["3090323751"]);
  Deno.exit(0);
});
