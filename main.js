const { app, Menu, MenuItem, BrowserWindow } = require('electron')

let mainWindow

// Template for aplication menu
let template = [
	{ label: app.getName(), submenu: [
		{ label: 'Over ' + app.getName(), click() { console.log('This is version: ' + app.getVersion() + ' of ' + app.getName()) } },
		{ type: 'separator' },
		{ label: 'Voorkeuren', accelerator: 'Command+,', click() { console.log('Voorkeuren') } },
		{ label: 'Uitloggen', click() { console.log('Uitloggen') } },
		{ type: 'separator' },
		{ role: 'hide' },
		{ role: 'hideothers' },
		{ type: 'separator' },
		{ role: 'quit' }
	] },
	{ label: 'Edit', submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
   ] },
	{ label: 'View', submenu: [
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
   ] },
	{ role: 'window', label: 'Venster', submenu: [
 		{ role: 'close', label: 'Sluiten', accelerator: 'Command+W', click() { console.log('Sluiten') } },
 		{ role: 'minimize', label: 'Minimaliseren', accelerator: 'Command+M', click() { console.log('Minimaliseren') } },
 		{ role: 'zoom', label: 'Zoomen',  }
 	] },
	{ label: 'Developer', submenu: [
      { label: 'Reload', accelerator: 'CmdOrCtrl+R', click (item, focusedWindow) { if (focusedWindow) focusedWindow.reload() } },
      { label: 'Toggle Developer Tools', accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I', click (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.toggleDevTools() } }
	] },
	{ role: 'help', submenu: [
   	{ label: app.getName() + ' Help', click () { require('electron').shell.openExternal('http://help.envado.com') } }
   ] }
]

const menu = Menu.buildFromTemplate(template)

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 1200, height: 800, minHeight: 600, minWidth: 800, titleBarStyle: 'hidden-inset', backgroundColor: '#242931'})

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`)

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})

	// Set application menu
  	Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
