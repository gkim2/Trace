package com.example.day04_activitymove;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		//로그 출력해보기
		Log.e("mainActivity","on Create()");
	}

	public void move(View v){
		EditText inputMsg = (EditText)findViewById(R.id.inputMsg);
		//입력한 문자열을 얻어온다.
		String msg = inputMsg.getText().toString();
		//로그 출력
		Log.e("입력한문자열",msg); 
		//2. activity 이동하면서  data 를 가지고 간다.
		
		//subActivity 로 이동한 Intent 객체를 생성한다.
		Intent intent = new Intent(this, SubActivity.class);
		
		intent.putExtra("msg", msg);
		//intent 객체를 전달하면서 startActivity () 메소드를 이용해서 액티비티 이동한다.
		startActivity(intent);
	}
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	
	@Override
	protected void onStart() {
		super.onStart();
		Log.e("mainActivity","on Start()");
	}
	
	@Override
	protected void onRestart() {
		super.onRestart();
		Log.e("mainActivity","on Restart()");
	}
	
	@Override
	protected void onPause() {
		super.onPause();
		Log.e("mainActivity","on Pasue()");
	}
	
	@Override
	protected void onStop() {
		super.onStop();
		Log.e("mainActivity","on Stop()");
	}
	
	@Override
	protected void onDestroy() {
		super.onDestroy();
		Log.e("mainActivity","on Destroy()");
	}
	
	
}


















