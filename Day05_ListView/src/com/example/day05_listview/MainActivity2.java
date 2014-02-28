package com.example.day05_listview;

import java.util.ArrayList;

import com.example.day05_listview.dto.MemDTO;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

//Activity 클래스 상속 받음
public class MainActivity2 extends Activity {

	@Override
	//필수 오버라이딩 onCreate 
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		//Content View Activity main
		setContentView(R.layout.activity_main2);
		
		//Activity_Main.xml 로 전개한 LIstView의 참조값 얻어오기
		ListView listView = (ListView)findViewById(R.id.listView);
		
		//Listview 에 출력할 모델 객체 생성하기
		final ArrayList<MemDTO> list = new ArrayList<MemDTO>();
		//모델에 샘플 데이터 넣어주기
		list.add(new MemDTO(1,"김구라","노량진"));
		list.add(new MemDTO(2,"해골","행신동"));
		list.add(new MemDTO(3,"우너숭","동물원"));
		list.add(new MemDTO(4,"주댕이","봉천동"));
		list.add(new MemDTO(5,"김덩이","상도동"));
		
	
	}
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
