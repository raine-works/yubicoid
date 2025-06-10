export const convertHexToDecimal = (serialNumbers: string[]): string[] => {
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
