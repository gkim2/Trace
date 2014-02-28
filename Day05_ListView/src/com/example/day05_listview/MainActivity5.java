package com.example.day05_listview;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.SparseBooleanArray;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

public class MainActivity5 extends Activity {
	// 필요한 멤버필드 정의하기
	ListView listview;
	ArrayAdapter<String> adapter;
	ArrayList<String> list;
	EditText inputName;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_main5);

		// EditText 의 참조값 얻어오기
		inputName = (EditText) findViewById(R.id.inputName);

		// ListView 의 참조값 얻어오기

		listview = (ListView) findViewById(R.id.listView);
		list = new ArrayList<String>();

		// 샘플 데이터 추가하기
		list.add("친구1");
		list.add("친구2");
		list.add("친구3");
		list.add("친구4");
		list.add("친구5");
		list.add("친구6");
		list.add("친구7");
		list.add("친구8");
		list.add("친구9");
		list.add("친구10");
		list.add("친구11");
		list.add("친구12");
		list.add("친구13");
		list.add("친구14");
		list.add("친구15");
		list.add("친구16");
		list.add("친구17");
		list.add("친구18");

		// adapter 객체 생성해서 model 연결하기
		adapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_list_item_multiple_choice, list);
		// listview 에 아답타 연결하기
		listview.setAdapter(adapter);

		listview.setOnTouchListener(new View.OnTouchListener() {

			@Override
			public boolean onTouch(View v, MotionEvent event) {
				Util.hideKeyboard(MainActivity5.this);
				Util.releaseFocus(inputName);
				return false;
			}
		});

	}

	// 버튼을 눌렀을때 호출되는 메소드
	public void addName(View v) {
		// 입력한 문자열을 얻어온다.
		String name = inputName.getText().toString();
		// model에 데이터를 추가한다.
		list.add(name);
		// model 의 데이터가 바뀌었다고 아댑터에 알린다.
		adapter.notifyDataSetChanged(); // 결과적으로 listview 가 업데이트 된다
		// 입력창 초기화
		inputName.setText("");
		// 셀의 마지막번째 인덱스 값을 얻어온다.
		int lastPosition = adapter.getCount();
		// adapter가 position 마지막 정보를 가지고 있음

		// 부드럽게 해당위치로 스크롤한다.
		listview.smoothScrollToPosition(lastPosition);

	}

	// 완료 버튼을 눌렀을 때 호출되는 메소드

	public void end(View v) {
		/*
		 * InputMethodManager im = (InputMethodManager)
		 * getSystemService(this.INPUT_METHOD_SERVICE);
		 * im.hideSoftInputFromWindow(inputName.getWindowToken() , 0);
		 * Toast.makeText(this, "완료버튼 눌림", 0).show();
		 */
		Toast.makeText(this, "완료버튼 눌림", Toast.LENGTH_SHORT).show();
		Util.hideKeyboard(this);
		Util.releaseFocus(inputName);
	}

	public void delete(View v) {
		
		Toast.makeText(this, "삭제버튼 눌림", Toast.LENGTH_SHORT).show();
		//체크된 아이템을 확인할 수 있는 희소 논리 배열 객체를 얻어온다.
		SparseBooleanArray sba =listview.getCheckedItemPositions();
		//반복문 돌면서 체크된 인덱스의 model 데이터를 삭제한다.
		
		for(int i=list.size()-1; i<=0; i--){
			//i 번째 boolean 값을 얻어온다
			boolean isSelected = sba.get(i);
			if(isSelected){
				//모델에서 해당 인덱스를 삭제한다.
				list.remove(i);
			}
		}//for
		//모델의 데이터가 바뀌었다고 아댑터에 알려서 화면을 갱신한다.
		adapter.notifyDataSetChanged();
		listview.clearChoices();
		
		
	}

}
