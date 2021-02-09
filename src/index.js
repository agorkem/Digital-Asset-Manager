const { Repos, connectDB } = require("./database");
const DirectoryLinker = require("./helpers/DirectoryLinker");

try {
connectDB().then(connection => {
  console.log("Database Connection established.");

  if (process.env.NODE_ENV === "linking") {
    DirectoryLinker("./testFolder", Repos);
  } else {
    (async () => {
      const folder = await Repos.FolderRepo.listDirectoryByPath("testFolder");
      console.log({
        ...folder,
        assets: folder.assets.map(assets => assets.name),
      });
    })();
  }

});
} catch (err) {
  console.error(err);
}
