package com.example.day03_buttonlistener;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class MainActivity4 extends Activity{
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_main4);
		
	}
	//
	public void insert(View v) {
		Toast.makeText(this, "입력합니다.",Toast.LENGTH_SHORT).show();

	}
	public void update(View v) {
		Toast.makeText(this, "수정합니다.",Toast.LENGTH_SHORT).show();	
	
		}
	public void delete(View v) {
		Toast.makeText(this, "삭제합니다.",Toast.LENGTH_SHORT).show();
	
	}

}
