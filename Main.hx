function main() {
    trace("Installing Hashlink...");
    switch Sys.systemName() {
        case "Windows": setupWindows();
        case "Mac": setupMac();
        default: setupLinux();
    }
}
private function setupWindows() {
    var folderName = "hl-1.11.0-win";
    Sys.command("powershell.exe -Command wget -O hl.zip https://github.com/HaxeFoundation/hashlink/releases/download/1.11/" + folderName + ".zip");
    Sys.command("powershell.exe -Command Expand-Archive -LiteralPath hl.zip -DestinationPath .");
    Sys.setCwd(folderName);
    Sys.command('powershell.exe -Command "echo "' + Sys.getCwd() + '" | Out-File -FilePath "' + Sys.getEnv("GITHUB_PATH") + '" -Encoding utf8 -Append"');
    trace("github_path: " + Sys.getEnv("GITHUB_PATH"));
}
private function setupLinux() {
    Sys.command("sudo apt-get install libpng-dev libturbojpeg-dev libvorbis-dev libopenal-dev libsdl2-dev libmbedtls-dev libuv1-dev"); //dependencies
    Sys.command("git clone https://github.com/HaxeFoundation/hashlink");
    Sys.setCwd("hashlink"); //change dir to hashlink
    Sys.command("sudo make all");
    Sys.command("sudo make install");
    Sys.setCwd("..");
    Sys.command("cp -r hashlink/* .");
    Sys.putEnv("PATH",Sys.getEnv("PATH") + ":" + Sys.getCwd());
    Sys.command("export PATH");
}
private function setupMac() {
    Sys.command('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'); //setup homebrew
    Sys.command("brew install hashlink");
}