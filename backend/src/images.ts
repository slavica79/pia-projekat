const base_user_directory = './public/users/'
const base_studio_directory = './public/studios/'

// za update
export function delete_folder(studio) {
  const FileSystem = require("fs");

  FileSystem.rmSync(base_studio_directory + studio, { recursive: true, force: true });
  /*FileSystem.rmdir(base_studio_directory + studio, (err) => {

      if (err) {
        return console.log("error occurred in deleting directory", err);
      }
      
      console.log("Directory deleted successfully");
    });*/
}

export function base64_to_image(base64Raw, username) {
  const FileSystem = require("fs");

  if (base64Raw == null) {
    return;
  }

  FileSystem.writeFile(base_user_directory + username, base64Raw, 'base64', function (err) { });
}

// main pict of studio
export function base64_to_image_studio(base64Raw, studio) {
  const FileSystem = require("fs");

  if (base64Raw == null) {
    return;
  }

  if (!FileSystem.existsSync(base_studio_directory + studio)) {
    FileSystem.mkdirSync(base_studio_directory + studio);
  }

  // slike u radionici nazivane po brojevima, nulta oznacava glavnu
  FileSystem.writeFile(base_studio_directory + studio + "/" + studio + "0", base64Raw, 'base64', function (err) { });
}

export function base64_to_images_studio(icons, studio) {
  const FileSystem = require("fs");

  if (icons == null || icons.length == 0) {
    return;
  }

  // ne proveravamo direktorijum jer je napravljen kod glavne

  // slike u radionici nazivane po brojevima, nulta oznacava glavnu
  for(let i = 1; i <= icons.length; i++) {
    FileSystem.writeFile(base_studio_directory + studio + "/" + studio + i.toString(), icons[i-1], 'base64', function (err) { });
  }
}

export function image_to_base64(username) {
  const FileSystem = require("fs");

  var icon = null;

  try {
    icon = FileSystem.readFileSync(base_user_directory + username);
  } catch {
    icon = null;
  }

  if (!icon) {
    return null;
  }

  return Buffer.from(icon).toString('base64');
}

// dohvatanje main pict
export function image_to_base64_studio(studio) {
  const FileSystem = require("fs");

  var icon = null;

  try {
    icon = FileSystem.readFileSync(base_studio_directory + studio + "/" + studio + "0");
  } catch {
    icon = null;
  }

  if (!icon) {
    return null;
  }
  return Buffer.from(icon).toString('base64');
}

// dohvatanje svih slika radionice za galeriju
export function images_to_base64_studio(studio) {
  const FileSystem = require("fs");

  var icons = FileSystem.readdirSync(base_studio_directory + studio);

  if (icons.length == 0) {
    return null;
  }

  var icons_base64 = []

  for(let i = 0; i < icons.length; i++) {
    var icon = FileSystem.readFileSync(base_studio_directory + studio + "/" + icons[i]);
    icons_base64.push("data:image/png;base64," + Buffer.from(icon).toString('base64'));
  }

  return icons_base64;
}