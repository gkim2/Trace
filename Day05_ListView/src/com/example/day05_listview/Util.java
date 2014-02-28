package com.example.day05_listview;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

public class Util {
	//키보드 숨기는 메소드
	public static void hideKeyboard(Activity activity){
		InputMethodManager im = (InputMethodManager)	
				activity.getSystemService(Context.INPUT_METHOD_SERVICE);
		if(activity.getCurrentFocus()==null) return;
				im.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken()	,	0);
				
	}
	
	
	//메소드의 인자로 전달되는 View 객체의 포커스 해제하는 메소드
	   public static void releaseFocus(View view) {
	        ViewParent parent = view.getParent();
	        ViewGroup group = null;
	        View child = null;
	        while (parent != null) {
	            if (parent instanceof ViewGroup) {
	                group = (ViewGroup) parent;
	                for (int i = 0; i < group.getChildCount(); i++) {
	                    child = group.getChildAt(i);
	                    if(child != view && child.isFocusable())
	                        child.requestFocus();
	                }
	            }
	            parent = parent.getParent();
	        }
	    }
	
}


