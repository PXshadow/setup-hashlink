package target;

import System.*;
import haxe.io.Path;
import sys.FileSystem;

class Hl {
	static final systemName = System.systemName;
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
				Sys.command('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'); //setup homebrew
			case "Windows":
				// pass
		}
		switch systemName {
			case "Windows":
				if (!FileSystem.exists("windows"))
					FileSystem.createDirectory("windows");
				Sys.setCwd("windows");
				if (!FileSystem.exists("hashlink")) {
					Sys.command('powershell.exe -Command wget -O hashlink.zip https://github.com/HaxeFoundation/hashlink/releases/download/1.11/hl-1.11.0-win.zip');
					Sys.command("powershell.exe -Command Expand-Archive hashlink.zip");
				} else
					infoMsg("Reusing hashlink binary");
				Sys.setCwd("hashlink/hl-1.11.0-win");
				Sys.command('powershell.exe -Command "echo "' + Sys.getCwd() + '" | Out-File -FilePath "' + Sys.getEnv("GITHUB_PATH") + '" -Encoding utf8 -Append"');
			default:
				Sys.putEnv("LD_LIBRARY_PATH","/usr/local/lib");
				if (!FileSystem.exists("hashlink")) {
					runCommand("git", ["clone", "https://github.com/HaxeFoundation/hashlink.git"]);
				} else
					infoMsg("Reusing hashlink repository");
				Sys.setCwd("hashlink");
				if (systemName == "Mac")
					Sys.command("brew bundle");

				Sys.command("sudo make all");
				Sys.command("sudo make install");
				Sys.command('echo "' + Sys.getCwd() + '" >> ' + Sys.getEnv("GITHUB_PATH"));
		}
		runCommand("hl", ["--version"]);
	}
}
