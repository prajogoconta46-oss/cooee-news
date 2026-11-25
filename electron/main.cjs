const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");

const allowedHosts = new Set(["www.clubcooee.com", "clubcooee.com"]);
const settings = new Set([
  "ms-settings:gaming-gamemode",
  "ms-settings:display",
  "ms-settings:notifications"
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 850, minWidth: 980, minHeight: 680,
    backgroundColor: "#0b1020",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile(path.join(__dirname, "..", "index.html"));
  win.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "https:" && allowedHosts.has(parsed.hostname)) shell.openExternal(url);
    } catch {}
    return { action: "deny" };
  });
}

ipcMain.handle("open-clubcooee", async () => {
  await shell.openExternal("https://www.clubcooee.com/");
  return true;
});
ipcMain.handle("open-official-search", async (_event, term) => {
  const q = encodeURIComponent(String(term || "").slice(0, 80));
  await shell.openExternal("https://www.google.com/search?q=" + encodeURIComponent("site:clubcooee.com " + q));
  return true;
});
ipcMain.handle("open-setting", async (_event, setting) => {
  if (!settings.has(setting)) throw new Error("Configuração não permitida");
  await shell.openExternal(setting);
  return true;
});
ipcMain.handle("open-folder", async (_event, folder) => {
  const allowed = { pictures: app.getPath("pictures"), downloads: app.getPath("downloads") };
  if (!allowed[folder]) throw new Error("Pasta não permitida");
  await shell.openPath(allowed[folder]);
  return true;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });