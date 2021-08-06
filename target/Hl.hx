package target;

import Config.*;
import System.*;
import haxe.io.Path;
import sys.FileSystem;

class Hl {

	static var hlSrc = switch [ci, systemName] {
			case [GithubActions, "Windows"]: "C:\\hashlink";
			case _: Path.join([Sys.getEnv("HOME"), "hashlink"]);
		};

	static public function getHlDependencies() {
		if (commandSucceed("hl", ["--version"])) {
			infoMsg('hl has already been installed.');
			return;
		}

		switch (systemName) {
			case "Linux":
				Linux.requireAptPackages([
					"ninja-build",
					"libpng-dev",
					"libjpeg-turbo8-dev",
					"libturbojpeg",
					"zlib1g-dev",
					"libvorbis-dev",
					"libopenal-dev",
					"libsdl2-dev",
					"libmbedtls-dev",
					"libuv1-dev",
				]);
			case "Mac":
				Sys.setCwd(hlSrc);
				Sys.command("brew bundle");
			case "Windows":
				// pass
		}

		switch systemName {
			case "Windows":
				if (!FileSystem.exists(hlSrc)) {
					Sys.command('powershell.exe -Command wget -O hashlink.zip https://github.com/HaxeFoundation/hashlink/releases/download/1.11/hl-1.11.0-win.zip');
					Sys.command("powershell.exe -Command Expand-Archive hashlink.zip");
				} else
					infoMsg("Reusing hashlink binary");
				addToPATH("hashlink/hl-1.11.0-win");
			default:
				Sys.putEnv("LD_LIBRARY_PATH","/usr/local/lib");
				if (!FileSystem.exists(hlSrc)) {
					runCommand("git", ["clone", "https://github.com/HaxeFoundation/hashlink.git", hlSrc]);
				} else
					infoMsg("Reusing hashlink repository");
				Sys.setCwd(hlSrc);
				Sys.command("sudo make all");
				Sys.command("sudo make install");
				addToPATH(hlSrc);
		}

		runCommand("hl", ["--version"]);
	}
}
