package com.example.day05_listview;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

public class MainActivity3 extends Activity{
	//필요한 멤버필드 정의하기
	ListView listview;
	ArrayAdapter<String> adapter;
	ArrayList<String> list;
	EditText inputName;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_main3);
		
		//EditText 의 참조값 얻어오기
		inputName = (EditText)findViewById(R.id.inputName);
		
		
		//ListView 의 참조값 얻어오기
		
		listview = (ListView)findViewById(R.id.listView);
		list = new ArrayList<String>();
		//adapter 객체 생성해서 model 연결하기
		 adapter = new ArrayAdapter<String>(
						this, 
						android.R.layout.simple_list_item_1,
						list);
		//listview 에 아답타 연결하기
		listview.setAdapter(adapter);
		
		listview.setOnTouchListener(new View.OnTouchListener() {
			
			@Override
			public boolean onTouch(View v, MotionEvent event) {
				Util.hideKeyboard(MainActivity3.this);
				Util.releaseFocus(inputName);
				return false;
			}
		});
	
	}
	
	
	//버튼을 눌렀을때 호출되는 메소드
	public void addName(View v){
		//입력한 문자열을 얻어온다.
		String name = inputName.getText().toString();
		//model에 데이터를 추가한다.
		list.add(name);
		//model 의 데이터가 바뀌었다고 아댑터에 알린다.
		adapter.notifyDataSetChanged(); // 결과적으로 listview 가 업데이트 된다
		//입력창 초기화
		inputName.setText("");
		//셀의 마지막번째 인덱스 값을 얻어온다.
		int lastPosition = adapter.getCount();
		//adapter가 position 마지막 정보를 가지고 있음
		
		//부드럽게 해당위치로 스크롤한다.
		listview.smoothScrollToPosition(lastPosition);
		
	}
	
	//완료 버튼을 눌렀을 때 호출되는 메소드
	
	public void end(View v){
		/*
		InputMethodManager im = (InputMethodManager)	
				getSystemService(this.INPUT_METHOD_SERVICE);
				im.hideSoftInputFromWindow(inputName.getWindowToken()	,	0);
				Toast.makeText(this, "완료버튼 눌림", 0).show();
			*/	
				Toast.makeText(this, "완료버튼 눌림", Toast.LENGTH_SHORT).show();
				Util.hideKeyboard(this);
				Util.releaseFocus(inputName);
	}

}
















