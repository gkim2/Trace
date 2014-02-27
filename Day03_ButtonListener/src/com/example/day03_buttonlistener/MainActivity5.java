package com.example.day03_buttonlistener;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class MainActivity5 extends Activity{
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_main4);
		
	}
	//
	public void push(View v){
		int resID = v.getId();
		
		switch(resID){
		case R.id.insertBtn : Toast.makeText(this, "입력합니다.",Toast.LENGTH_SHORT).show();
			break;
		
		case R.id.updateBtn : Toast.makeText(this, "수정합니다.",Toast.LENGTH_SHORT).show();
			
			break;
			
		case R.id.deleteBtn : Toast.makeText(this, "입력합니다.",Toast.LENGTH_SHORT).show();
			
			break;
			
		}
	}

}
