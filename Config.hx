import sys.FileSystem;

enum Ci {
	GithubActions;
}

class Config {
	static public final systemName = Sys.systemName();
	static public final cwd = Sys.getCwd();
	static public final repoDir = FileSystem.fullPath("..") + "/";
	static public final unitDir = cwd + "unit/";
	static public final ci:Null<Ci> = if (Sys.getEnv("GITHUB_WORKSPACE") != null) GithubActions; else null;
	static public final home = Sys.getEnv("HOME") == null ? Sys.getCwd() : Sys.getEnv("HOME");

	static public function isCi():Bool {
		return ci != null;
	}

	static public final colorSupported = switch [ci, systemName] {
			case [GithubActions, _]: true;
			case [_, "Linux" | "Mac"]: true;
			case [_, "Windows"]: false;
			case _: false;
		}
}
