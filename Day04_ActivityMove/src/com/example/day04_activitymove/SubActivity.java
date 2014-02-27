package com.example.day04_activitymove;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

public class SubActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		Log.w("subActivity","on Create");
		setContentView(R.layout.activity_sub);
		
		Intent intent = getIntent();
		String msg = intent.getStringExtra("msg");
		
		//activity_syb.xml 로 전개된 TextView 의 참조값 얻어오기
		TextView result = (TextView)findViewById(R.id.result);
		//문자열 출력하기
		result.setText(msg);
	}
	
		//종료버튼을 눌렀을때 호출되는 메소드
		public void end(View v){
			//현재 액티비티 저장하기
			finish();
		}
		
		
		@Override
		protected void onStart() {
			super.onStart();
			Log.e("subActivity","on Start()");
		}
		
		@Override
		protected void onRestart() {
			super.onRestart();
			Log.e("subActivity","on Restart()");
		}
		
		@Override
		protected void onPause() {
			super.onPause();
			Log.e("subActivity","on Pasue()");
		}
		
		@Override
		protected void onStop() {
			super.onStop();
			Log.e("subActivity","on Stop()");
		}
		
		@Override
		protected void onDestroy() {
			super.onDestroy();
			Log.e("subActivity","on Destroy()");
		}

}

