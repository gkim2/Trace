package com.example.day03_buttonlistener;

import android.app.Activity;
import android.os.Bundle;
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
public class MainActivity2 extends Activity{
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_main2);
		
		//R.java 에 등록된 리소스 아이디 값을 이용해서 buttin 객체의 참조값 얻어오기
		View view = findViewById(R.id.myButton);
		//버튼 타입으로 형변환
		Button myButton = (Button)view;
		//view.onClickListener 객체의 참조값 얻어오기
		View.OnClickListener listener = new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				//리스너를 등록한 버튼이 눌러졌을때 호출되는 부분
				Toast.makeText(MainActivity2.this, "버튼누름",Toast.LENGTH_SHORT).show();
			}
		};
		//버튼에 리스너 등록하기
		myButton.setOnClickListener(listener);
	}
	
	//화면 구성하기
	
	

	
	
	
}//Activity






















