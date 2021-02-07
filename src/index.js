const { Repos, connectDB } = require('./database');
const DirectoryLinker = require('./helpers/DirectoryLinker');

connectDB().then(connection => {
  console.log('Database Connection established.');

  if (process.env.ACTION === 'linking') {
    DirectoryLinker(Repos);
  } else {
    (async () => {
      const folder = await Repos.FolderRepo.listDirectoryByPath('testFolder');
      console.log({
        ...folder,
        assets: folder.assets.map(assets => assets.name),
      });
    })();
  }

});
