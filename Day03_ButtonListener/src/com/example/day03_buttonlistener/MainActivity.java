package com.example.day03_buttonlistener;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.widget.Toast;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}
	
	//버튼을 눌렀을때 호출되는 메소드 정의하기
	
	public void push(View v){
		//메소드의 인자로 눌러진 버튼의 참조값이 전달된다.
		Toast.makeText(this, "버튼을 누르셨군요", Toast.LENGTH_LONG).show();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
