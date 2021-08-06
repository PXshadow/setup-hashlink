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
	static var hlBuild = switch [ci, systemName] {
			case [GithubActions, "Windows"]: "C:\\hashlink_build";
			case _: Path.join([Sys.getEnv("HOME"), "hashlink_build"]);
		};
	static var hlBinDir = switch [ci, systemName] {
			case [GithubActions, "Windows"]: "C:\\hashlink_build\\bin";
			case _: Path.join([Sys.getEnv("HOME"), "hashlink_build", "bin"]);
		};
	static var hlBinary = switch [ci, systemName] {
			case [GithubActions, "Windows"]: "C:\\hashlink_build\\bin\\hl.exe";
			case _: Path.join([Sys.getEnv("HOME"), "hashlink_build", "bin", "hl"]);
		};

	static public function getHlDependencies() {
		if (commandSucceed("hl", ["--version"])) {
			infoMsg('hl has already been installed.');
			return;
		}
		if (!FileSystem.exists(hlSrc)) {
			runCommand("git", ["clone", "https://github.com/HaxeFoundation/hashlink.git", hlSrc]);
		} else
			infoMsg("Reusing hashlink repository");

		switch (systemName) {
			case "Linux":
				Linux.requireAptPackages([
					"libpng-dev",
					"libjpeg-turbo8-dev",
					"libturbojpeg",
					"zlib1g-dev",
					"libvorbis-dev"
				]);
			case "Mac":
				runCommand("brew", ["update", '--preinstall'], true);
				runCommand("brew", ["bundle", '--file=${hlSrc}/Brewfile'], true);
			case "Windows":
				// pass
		}

		FileSystem.createDirectory(hlBuild);
		var generator = systemName == "Windows" ? ["-DCMAKE_SYSTEM_VERSION=10.0.19041.0"] : ["-GNinja"];
		runCommand("cmake", generator.concat([
			"-DBUILD_TESTING=OFF", "-DWITH_BULLET=OFF", "-DWITH_DIRECTX=OFF", "-DWITH_FMT=ON", "-DWITH_OPENAL=OFF", "-DWITH_SDL=OFF", "-DWITH_SQLITE=OFF",
			"-DWITH_SSL=OFF", "-DWITH_UI=OFF", "-DWITH_UV=OFF", "-DWITH_VIDEO=OFF", "-B" + hlBuild, "-H" + hlSrc
		]));
		runCommand("cmake", ["--build", hlBuild]);

		runCommand(hlBinary, ["--version"]);
		addToPATH(hlBinDir);
	}
}