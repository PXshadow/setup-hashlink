// Generated by Haxe 4.2.0
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Ci = $hxEnums["Ci"] = { __ename__:true,__constructs__:null
	,GithubActions: {_hx_name:"GithubActions",_hx_index:0,__enum__:"Ci",toString:$estr}
};
Ci.__constructs__ = [Ci.GithubActions];
var Sys = function() { };
Sys.__name__ = true;
Sys.systemName = function() {
	var _g = process.platform;
	switch(_g) {
	case "darwin":
		return "Mac";
	case "freebsd":
		return "BSD";
	case "linux":
		return "Linux";
	case "win32":
		return "Windows";
	default:
		var other = _g;
		return other;
	}
};
var js_node_Fs = require("fs");
var Config = function() { };
Config.__name__ = true;
Config.isCi = function() {
	return Config.ci != null;
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Linux = function() { };
Linux.__name__ = true;
Linux.isAptPackageInstalled = function(aptPackage) {
	return System.commandSucceed("dpkg-query",["-W","-f='${Status}'",aptPackage]);
};
Linux.requireAptPackages = function(packages) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < packages.length) {
		var p = packages[_g1];
		++_g1;
		if(!Linux.isAptPackageInstalled(p)) {
			_g.push(p);
		}
	}
	var notYetInstalled = _g;
	if(notYetInstalled.length > 0) {
		var aptCacheDir = process.env["APT_CACHE_DIR"];
		var baseCommand = aptCacheDir != null ? ["apt-get","-o","dir::cache::archives=" + aptCacheDir,"install","-qqy"] : ["apt-get","install","-qqy"];
		System.runCommand("sudo",baseCommand.concat(notYetInstalled),true);
	}
};
function Main_main() {
	target_Hl.getHlDependencies();
	var args = null;
	if(args == null) {
		js_node_ChildProcess.spawnSync("hl",{ shell : true, stdio : "inherit"});
	} else {
		js_node_ChildProcess.spawnSync("hl",args,{ stdio : "inherit"});
	}
}
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_io_Output = function() { };
haxe_io_Output.__name__ = true;
var _$Sys_FileOutput = function(fd) {
	this.fd = fd;
};
_$Sys_FileOutput.__name__ = true;
_$Sys_FileOutput.__super__ = haxe_io_Output;
_$Sys_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		js_node_Fs.writeSync(this.fd,String.fromCodePoint(c));
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		return js_node_Fs.writeSync(this.fd,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length),pos,len);
	}
	,writeString: function(s,encoding) {
		js_node_Fs.writeSync(this.fd,s);
	}
	,flush: function() {
		js_node_Fs.fsyncSync(this.fd);
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
});
var haxe_io_Input = function() { };
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) {
			bufsize = 16384;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		var total = new haxe_io_BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				total.addBytes(buf,0,len);
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return total.getBytes();
	}
	,readLine: function() {
		var buf = new haxe_io_BytesBuffer();
		var last;
		var s;
		try {
			while(true) {
				last = this.readByte();
				if(!(last != 10)) {
					break;
				}
				buf.addByte(last);
			}
			s = buf.getBytes().toString();
			if(HxOverrides.cca(s,s.length - 1) == 13) {
				s = HxOverrides.substr(s,0,-1);
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof haxe_io_Eof)) {
				var e = _g1;
				s = buf.getBytes().toString();
				if(s.length == 0) {
					throw haxe_Exception.thrown(e);
				}
			} else {
				throw _g;
			}
		}
		return s;
	}
};
var _$Sys_FileInput = function(fd) {
	this.fd = fd;
};
_$Sys_FileInput.__name__ = true;
_$Sys_FileInput.__super__ = haxe_io_Input;
_$Sys_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		try {
			js_node_Fs.readSync(this.fd,buf,0,1,null);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		try {
			return js_node_Fs.readSync(this.fd,buf,pos,len,null);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
});
var Failure = $hxEnums["Failure"] = { __ename__:true,__constructs__:null
	,Fail: {_hx_name:"Fail",_hx_index:0,__enum__:"Failure",toString:$estr}
};
Failure.__constructs__ = [Failure.Fail];
var System = function() { };
System.__name__ = true;
System.successMsg = function(msg) {
	process.stdout.write(Std.string(Config.colorSupported ? "\x1B[32m" + msg + "\x1B[0m" : msg));
	process.stdout.write("\n");
};
System.failMsg = function(msg) {
	process.stdout.write(Std.string(Config.colorSupported ? "\x1B[31m" + msg + "\x1B[0m" : msg));
	process.stdout.write("\n");
};
System.infoMsg = function(msg) {
	process.stdout.write(Std.string(Config.colorSupported ? "\x1B[36m" + msg + "\x1B[0m" : msg));
	process.stdout.write("\n");
};
System.commandSucceed = function(cmd,args) {
	try {
		var p = new sys.io.Process(cmd,args);
		var succeed = p.exitCode() == 0;
		p.close();
		return succeed;
	} catch( _g ) {
		return false;
	}
};
System.commandResult = function(cmd,args) {
	var p = new sys.io.Process(cmd,args);
	var out = { stdout : p.stdout.readAll().toString(), stderr : p.stderr.readAll().toString(), exitCode : p.exitCode()};
	p.close();
	return out;
};
System.runCommand = function(cmd,args,useRetry,allowFailure) {
	if(allowFailure == null) {
		allowFailure = false;
	}
	if(useRetry == null) {
		useRetry = false;
	}
	var trials = useRetry ? 3 : 1;
	var exitCode = 1;
	var cmdStr = cmd + (args == null ? "" : " " + Std.string(args));
	while(trials-- > 0) {
		System.infoMsg("Command: " + cmdStr);
		var hrtime = process.hrtime();
		var t = hrtime[0] + hrtime[1] / 1e9;
		exitCode = args == null ? js_node_ChildProcess.spawnSync(cmd,{ shell : true, stdio : "inherit"}).status : js_node_ChildProcess.spawnSync(cmd,args,{ stdio : "inherit"}).status;
		var hrtime1 = process.hrtime();
		var dt = Math.round(hrtime1[0] + hrtime1[1] / 1e9 - t);
		if(exitCode == 0) {
			System.successMsg("Command exited with " + exitCode + " in " + dt + "s: " + cmdStr);
			return;
		} else {
			System.failMsg("Command exited with " + exitCode + " in " + dt + "s: " + cmdStr);
		}
		if(trials > 0) {
			System.infoMsg("Command will be re-run...");
		}
	}
	if(!allowFailure) {
		System.fail();
	}
};
System.deleteDirectoryRecursively = function(dir) {
	if(Sys.systemName() == "Windows") {
		var args;
		try {
			args = js_node_Fs.realpathSync(dir);
		} catch( _g ) {
			args = null;
		}
		var args1 = ["/S","/Q",StringTools.replace(args,"/","\\")];
		if(args1 == null) {
			return js_node_ChildProcess.spawnSync("rmdir",{ shell : true, stdio : "inherit"}).status;
		} else {
			return js_node_ChildProcess.spawnSync("rmdir",args1,{ stdio : "inherit"}).status;
		}
	} else {
		var args = ["-rf",dir];
		if(args == null) {
			return js_node_ChildProcess.spawnSync("rm",{ shell : true, stdio : "inherit"}).status;
		} else {
			return js_node_ChildProcess.spawnSync("rm",args,{ stdio : "inherit"}).status;
		}
	}
};
System.fail = function() {
	System.success = false;
	throw haxe_Exception.thrown(Failure.Fail);
};
System.addToPATH = function(path) {
	System.infoMsg("Prepending " + path + " to PATH.");
	switch(Config.systemName) {
	case "Linux":case "Mac":
		var v = path + ":" + process.env["PATH"];
		process.env["PATH"] = v;
		break;
	case "Windows":
		var v = path + ";" + process.env["PATH"];
		process.env["PATH"] = v;
		break;
	}
};
System.haxelibInstallGit = function(account,repository,branch,srcPath,useRetry,altName) {
	if(useRetry == null) {
		useRetry = false;
	}
	var name = altName == null ? repository : altName;
	try {
		System.getHaxelibPath(name);
		System.infoMsg("" + name + " has already been installed.");
	} catch( _g ) {
		var args = ["git",name,"https://github.com/" + account + "/" + repository];
		if(branch != null) {
			args.push(branch);
		}
		if(srcPath != null) {
			args.push(srcPath);
		}
		System.runCommand("haxelib",args,useRetry);
	}
};
System.haxelibInstall = function(library) {
	try {
		System.getHaxelibPath(library);
		System.infoMsg("" + library + " has already been installed.");
	} catch( _g ) {
		System.runCommand("haxelib",["install",library]);
	}
};
System.haxelibRun = function(args,useRetry) {
	if(useRetry == null) {
		useRetry = false;
	}
	System.runCommand("haxelib",["run"].concat(args),useRetry);
};
System.getHaxelibPath = function(libName) {
	var proc = new sys.io.Process("haxelib",["path",libName]);
	var result;
	var code = proc.exitCode();
	while(true) {
		result = proc.stdout.readLine();
		if(!StringTools.startsWith(result,"-L")) {
			break;
		}
	}
	proc.close();
	if(code != 0) {
		throw haxe_Exception.thrown("Failed to get haxelib path (" + result + ")");
	}
	return result;
};
System.changeDirectory = function(path) {
	process.stdout.write(Std.string("Changing directory to " + path));
	process.stdout.write("\n");
	process.chdir(path);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_Path = function() { };
haxe_io_Path.__name__ = true;
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	var _g2 = paths;
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	var paths = _g;
	if(paths.length == 0) {
		return "";
	}
	var path = paths[0];
	var _g = 1;
	var _g1 = paths.length;
	while(_g < _g1) {
		var i = _g++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var tmp = target.join(slash);
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = tmp;
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_ChildProcess = require("child_process");
var js_node_KeyValue = {};
js_node_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_node_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_node_Path = require("path");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_stream_WritableNewOptionsAdapter = {};
js_node_stream_WritableNewOptionsAdapter.from = function(options) {
	if(!Object.prototype.hasOwnProperty.call(options,"final")) {
		Object.defineProperty(options,"final",{ get : function() {
			return options.final_;
		}});
	}
	return options;
};
var js_node_url_URLSearchParamsEntry = {};
js_node_url_URLSearchParamsEntry._new = function(name,value) {
	var this1 = [name,value];
	return this1;
};
js_node_url_URLSearchParamsEntry.get_name = function(this1) {
	return this1[0];
};
js_node_url_URLSearchParamsEntry.get_value = function(this1) {
	return this1[1];
};
var sys_FileSystem = function() { };
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _g ) {
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( _g ) {
		var e = haxe_Exception.caught(_g).unwrap();
		if(e.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _g1 ) {
				throw e;
			}
			if(!stat.isDirectory()) {
				throw e;
			}
		}
	}
};
var target_Hl = function() { };
target_Hl.__name__ = true;
target_Hl.getHlDependencies = function() {
	if(System.commandSucceed("hl",["--version"])) {
		System.infoMsg("hl has already been installed.");
		return;
	}
	if(!sys_FileSystem.exists(target_Hl.hlSrc)) {
		System.runCommand("git",["clone","https://github.com/HaxeFoundation/hashlink.git",target_Hl.hlSrc]);
	} else {
		System.infoMsg("Reusing hashlink repository");
	}
	switch(Config.systemName) {
	case "Linux":
		Linux.requireAptPackages(["ninja-build","libpng-dev","libjpeg-turbo8-dev","libturbojpeg","zlib1g-dev","libvorbis-dev"]);
		break;
	case "Mac":
		System.runCommand("brew",["update","--preinstall"],true);
		System.runCommand("brew",["bundle","--file=" + target_Hl.hlSrc + "/Brewfile"],true);
		break;
	case "Windows":
		if(Config.ci == Ci.GithubActions) {
			var version = "3.21.1";
			System.runCommand("powershell.exe -Command Invoke-WebRequest https://github.com/Kitware/CMake/releases/download/v" + version + "/cmake-" + version + "-windows-x86_64.zip -Outfile cmake.zip");
			System.runCommand("powershell.exe -Command Expand-Archive cmake.zip");
			System.runCommand("powershell.exe -Command Add-Content $Env:GITHUB_PATH " + ("(Resolve-Path cmake/cmake-" + version + "-windows-x86_64/bin) -NoNewline"));
		}
		break;
	}
	sys_FileSystem.createDirectory(target_Hl.hlBuild);
	var generator = Config.systemName == "Windows" ? ["-DCMAKE_SYSTEM_VERSION=10.0.19041.0"] : ["-GNinja"];
	System.runCommand("cmake",generator.concat(["-DBUILD_TESTING=OFF","-DWITH_BULLET=OFF","-DWITH_DIRECTX=OFF","-DWITH_FMT=ON","-DWITH_OPENAL=OFF","-DWITH_SDL=OFF","-DWITH_SQLITE=OFF","-DWITH_SSL=OFF","-DWITH_UI=OFF","-DWITH_UV=OFF","-DWITH_VIDEO=OFF","-B" + target_Hl.hlBuild,"-H" + target_Hl.hlSrc]));
	System.runCommand("cmake",["--build",target_Hl.hlBuild]);
	System.runCommand(target_Hl.hlBinary,["--version"]);
	System.addToPATH(target_Hl.hlBinDir);
};
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
Config.systemName = Sys.systemName();
Config.cwd = process.cwd();
Config.repoDir = (function($this) {
	var $r;
	var tmp;
	try {
		tmp = js_node_Fs.realpathSync("..");
	} catch( _g ) {
		tmp = null;
	}
	$r = tmp + "/";
	return $r;
}(this));
Config.unitDir = Config.cwd + "unit/";
Config.ci = process.env["GITHUB_WORKSPACE"] != null ? Ci.GithubActions : null;
Config.home = process.env["HOME"] == null ? process.cwd() : process.env["HOME"];
Config.colorSupported = (function($this) {
	var $r;
	var _g = Config.ci;
	$r = _g == null ? (function($this) {
		var $r;
		switch(Config.systemName) {
		case "Linux":case "Mac":
			$r = true;
			break;
		case "Windows":
			$r = false;
			break;
		default:
			$r = false;
		}
		return $r;
	}($this)) : (function($this) {
		var $r;
		switch(_g._hx_index) {
		case 0:
			$r = true;
			break;
		}
		return $r;
	}($this));
	return $r;
}(this));
System.success = true;
target_Hl.hlSrc = (function($this) {
	var $r;
	var _g = Config.ci;
	var _g1 = Config.systemName;
	$r = _g == null ? haxe_io_Path.join([process.env["HOME"],"hashlink"]) : (function($this) {
		var $r;
		switch(_g._hx_index) {
		case 0:
			$r = _g1 == "Windows" ? "C:\\hashlink" : haxe_io_Path.join([process.env["HOME"],"hashlink"]);
			break;
		}
		return $r;
	}($this));
	return $r;
}(this));
target_Hl.hlBuild = (function($this) {
	var $r;
	var _g = Config.ci;
	var _g1 = Config.systemName;
	$r = _g == null ? haxe_io_Path.join([process.env["HOME"],"hashlink_build"]) : (function($this) {
		var $r;
		switch(_g._hx_index) {
		case 0:
			$r = _g1 == "Windows" ? "C:\\hashlink_build" : haxe_io_Path.join([process.env["HOME"],"hashlink_build"]);
			break;
		}
		return $r;
	}($this));
	return $r;
}(this));
target_Hl.hlBinDir = (function($this) {
	var $r;
	var _g = Config.ci;
	var _g1 = Config.systemName;
	$r = _g == null ? haxe_io_Path.join([process.env["HOME"],"hashlink_build","bin"]) : (function($this) {
		var $r;
		switch(_g._hx_index) {
		case 0:
			$r = _g1 == "Windows" ? "C:\\hashlink_build\\bin" : haxe_io_Path.join([process.env["HOME"],"hashlink_build","bin"]);
			break;
		}
		return $r;
	}($this));
	return $r;
}(this));
target_Hl.hlBinary = (function($this) {
	var $r;
	var _g = Config.ci;
	var _g1 = Config.systemName;
	$r = _g == null ? haxe_io_Path.join([process.env["HOME"],"hashlink_build","bin","hl"]) : (function($this) {
		var $r;
		switch(_g._hx_index) {
		case 0:
			$r = _g1 == "Windows" ? "C:\\hashlink_build\\bin\\hl.exe" : haxe_io_Path.join([process.env["HOME"],"hashlink_build","bin","hl"]);
			break;
		}
		return $r;
	}($this));
	return $r;
}(this));
Main_main();
})({});
