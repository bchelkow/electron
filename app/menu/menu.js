import { Menu, shell, app, dialog } from 'electron';

const template = [
  {
    label  : 'File',
    submenu: [
      {
        label: 'Open...',
        click(item, focusedWindow) {
          dialog.showOpenDialog({
            title      : 'Open directory',
            defaultPath: '~/',
            buttonLabel: 'Open',
            properties : ['openDirectory']
          }, function (directory) {
            if (directory) {
              focusedWindow.webContents.send('directory-change' , {directory:directory[0]});
            }
          });
        }
      }
    ]
  },
  {
    label  : 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label  : 'View',
    submenu: [
      {
        label      : 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        role: 'togglefullscreen'
      },
      {
        label      : 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      }
    ]
  },
  {
    role   : 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role   : 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell
            .openExternal('http://electron.atom.io');
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  const name = app
    .getName();
  template.unshift({
    label  : name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });
  // Window menu.
  template[3].submenu = [
    {
      label      : 'Close',
      accelerator: 'CmdOrCtrl+W',
      role       : 'close'
    },
    {
      label      : 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role       : 'minimize'
    },
    {
      label: 'Zoom',
      role : 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role : 'front'
    }
  ];
}

export default Menu.buildFromTemplate(template);
