package com.example.day03_buttonlistener;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.widget.SimpleCursorAdapter.ViewBinder;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

/*
 *  컨트롤러 역활을 하는 Activity 클래스 정의하기
 *  
 *  1. Activity 클래스를 상속받는다.
 *  2.onCreate() 메소드를 오버라이딩한다.
 *  3.setContenView() 메소드를 호출해서 화면을 구성한다.
 *  4.AndroidManifest.xml 에 Activity 클래스 이름을 등록한다.
 *  
 */
public class MainActivity3 extends Activity implements View.OnClickListener{
	
	//2. onCreate 메소드 오버라이딩
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		//3. 화면 구성하기
		
		setContentView(R.layout.activity_main3);
		
		//activity_main.xml 로 전개된 button 객체의 참조값 얻어오기
		Button btn = (Button)findViewById(R.id.myButton);  //ID 얻어오기
		
		btn.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		// TODO Auto-generated method stub
		Toast.makeText(this, "버튼을 눌렀다",Toast.LENGTH_SHORT).show();
	}

}









