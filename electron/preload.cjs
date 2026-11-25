const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("cooeeTools", {
  openClubCooee: () => ipcRenderer.invoke("open-clubcooee"),
  searchOfficial: (term) => ipcRenderer.invoke("open-official-search", term),
  openSetting: (setting) => ipcRenderer.invoke("open-setting", setting),
  openFolder: (folder) => ipcRenderer.invoke("open-folder", folder)
});