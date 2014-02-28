package com.example.day04_webview;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}
	
	//네이버로 이동하기 버튼을 눌렀을대 호출되는 메소드
	public void gonaver(View v){
		String url="http://www.naver.com";
		//WebActivity 로 이동하기 위한 인텐트 객체 생성하기
		Intent intent = new Intent(this,WebActibity.class);
		//Intent 객 체에 이동할 url 주소를 담는다.
		intent.putExtra("url", url);
		//startActivity() 메소드를 호출해서 액티비티 이동한다.
		startActivity(intent);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
