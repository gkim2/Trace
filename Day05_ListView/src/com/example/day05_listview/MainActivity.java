package com.example.day05_listview;

import java.util.ArrayList;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.ArrayAdapter;
import android.widget.ListView;

//Activity 클래스 상속 받음
public class MainActivity extends Activity {

	@Override
	//필수 오버라이딩 onCreate 
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		//Content View Activity main
		setContentView(R.layout.activity_main);
		
		//Activity_Main.xml 로 전개한 LIstView의 참조값 얻어오기
		ListView listView = (ListView)findViewById(R.id.listView);
		
		ArrayList<String> friendList = new ArrayList<String>();
		//샘플데이터
		friendList.add("친구1");
		friendList.add("친구2");
		friendList.add("친구3");
		friendList.add("친구4");
		friendList.add("친구5");
		friendList.add("친구6");
		friendList.add("친구7");
		friendList.add("친구8");
		friendList.add("친구9");
		friendList.add("친구10");
		friendList.add("친구11");
		friendList.add("친구12");
		friendList.add("친구13");
		friendList.add("친구14");
		friendList.add("친구15");
		friendList.add("친구16");
		friendList.add("친구17");
		friendList.add("친구18");
		
		
		//Model을 ListView 에 출력하게 도와주는 
		ArrayAdapter<String> adapter = 
				new ArrayAdapter<String>(this,       		   //Context
						android.R.layout.simple_list_item_1,	//셀의 레이아웃 리소스
						friendList												// Model
						);
		//ListView 에 Adapter 객체 연결하기
		listView.setAdapter(adapter);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
