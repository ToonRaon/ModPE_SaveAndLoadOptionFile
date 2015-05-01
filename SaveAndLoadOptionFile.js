const CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const RESOURCE_PATH = SD_CARD + "/games/com.mojang/worldedit/";
const OPTION_PATH = RESOURCE_PATH + "option/";

const File = java.io.File;
const BufferedReader = java.io.BufferedReader;
const InputStreamReader = java.io.InputStreamReader;
const FileInputStream = java.io.FileInputStream;
const FileOutputStream = java.io.FileOutputStream;
const OutputStreamWriter = java.io.OutputStreamWriter;

const OPTION_FILE = OPTION_PATH + "options.txt";

//폴더 생성
if(!File(OPTION_PATH).exists())
	File(OPTION_PATH).mkdirs();
//파일 생성
if(!File(OPTION_FILE).exists())
	File(OPTION_FILE).createNewFile();

function saveOption(option, value) {
	try {
		var fileInputStream = new FileInputStream(File(OPTION_FILE));
		var inputStreamReader = new InputStreamReader(fileInputStream);
		var bufferedReader = new BufferedReader(inputStreamReader);
		
		var fileContent = "";
		while(true) {
			var temp = bufferedReader.readLine();
			
			if(temp == null) //파일 끝
				break;
			
			temp += ""; //자바 -> 자바스크립트 문자열 형변환
			if(temp.split("=")[0] == option) //이미 밸류가 저장된 경우 무시
				continue;
			
			fileContent += temp + "\n";
		}
		
		fileInputStream.close();
		inputStreamReader.close();
		bufferedReader.close();
		
		var fileOutputStream = new FileOutputStream(File(OPTION_FILE));
		var outputStreamWriter = new OutputStreamWriter(fileOutputStream);
		
		outputStreamWriter.write(fileContent + option.toString() + "=" + value.toString()); //새로운 데이터 덧붙여 저장
		
		outputStreamWriter.close();
		fileOutputStream.close();
	} catch(e) {
		print(e);
	}
}

function loadOption(option) {
	try {
		var fileInputStream = new FileInputStream(File(OPTION_FILE));
		var inputStreamReader = new InputStreamReader(fileInputStream);
		var bufferedReader = new BufferedReader(inputStreamReader);
		
		var value = "";
		while(true) {
			var temp = bufferedReader.readLine();
			
			if(temp == null) //파일의 끝
				break;
			
			temp += ""; //자바 -> 자바스크립트 문자열 형변환
			
			if(temp.split("=")[0] == option) {
				value = temp.split("=")[1];
				break;
			}
		}
		
		fileInputStream.close();
		inputStreamReader.close();
		bufferedReader.close();
		
		return value;
	} catch(e) {
		print(e);
	}
}

saveOption("test", true);
print(loadOption("test"));