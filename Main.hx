
function main() {
    final systemName = Sys.systemName();
    switch systemName {
        case "Windows":
            deleteDirectoryRecursively("hashlink_windows");
            Sys.println("---------------------");
            Sys.command('powershell.exe -Command wget -O hashlink.zip https://github.com/HaxeFoundation/hashlink/releases/download/1.13/hl-1.13.0-win.zip');
            if (!sys.FileSystem.exists("hashlink_windows"))
                sys.FileSystem.createDirectory("hashlink_windows");
			Sys.command("powershell.exe -Command Expand-Archive hashlink.zip -DestinationPath hashlink_windows");
            Sys.setCwd("hashlink_windows/hl-1.13.0-win");
            
            Sys.command('powershell.exe -Command "echo "' + Sys.getCwd() + '" | Out-File -FilePath "' + Sys.getEnv("GITHUB_PATH") + '" -Encoding utf8 -Append"');
        case "Linux":
            deleteDirectoryRecursively("hashlink");
            Sys.println("---------------------");
	        // Sys.command("sudo apt-get update -y");
            Sys.command("sudo apt-get install --no-install-recommends -y libmbedtls-dev libopenal-dev libpng-dev libsdl2-dev libturbojpeg-dev libuv1-dev libvorbis-dev libsqlite3-dev");
            Sys.command("sudo git clone https://github.com/HaxeFoundation/hashlink");
            Sys.setCwd("hashlink");
            Sys.command("sudo make");
            Sys.command("sudo make all");
            Sys.command("sudo make install");
            Sys.command("sudo ldconfig");
            Sys.command('echo "' + Sys.getCwd() + '" >> ' + Sys.getEnv("GITHUB_PATH"));
            Sys.setCwd("..");
        case "Mac":
            Sys.command('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'); //setup homebrew
            Sys.command("brew install hashlink");
    }
    if (systemName != "Mac") {
        Sys.putEnv("Hashlink",Sys.getCwd());
        Sys.putEnv("HASHLINKPATH",Sys.getCwd());
    }
}

private function deleteDirectoryRecursively(dir:String):Int {
    return switch (Sys.systemName()) {
        case "Windows":
            Sys.command("rmdir /s /q " + dir);
        case _:
            Sys.command("rm -rf " + dir);
    }
}
