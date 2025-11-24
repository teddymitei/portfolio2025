import FileSystemBash, { FileSystemType } from "../fileSystemBash";

export default function clear(print: (s: string, md?: boolean) => void) {
  const docs = {
    name: "clear",
    short: "Clear the terminal screen",
    long: "Clears all text from the terminal screen and resets cursor position"
  };

  const app = (args: string[], options: string[]) => {
    // Clear the screen by calling the screen text engine directly
    const screenTextEngine = (window as any).screenTextEngine;
    if (screenTextEngine) {
      if (screenTextEngine.clearScreen) {
        screenTextEngine.clearScreen();
      } else if (screenTextEngine.clear) {
        screenTextEngine.clear();
      } else if (screenTextEngine.setText) {
        screenTextEngine.setText("");
      }
      
      // Reset cursor position if available
      if (screenTextEngine.setCursorPosition) {
        screenTextEngine.setCursorPosition(0, 0);
      } else if (screenTextEngine.setCursor) {
        screenTextEngine.setCursor(0, 0);
      }
    }
    
    return "";
  };

  return { docs, app };
}