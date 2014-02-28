package com.example.day04_webview;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.support.v4.app.NavUtils;

public class WebActibity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_web);
		// Show the Up button in the action bar.
		setupActionBar();
		
		//인텐트 객체에 담겨서 전달된 url 주소를 얻어온다.
		String url = getIntent().getStringExtra("url");
		
		//activity_web.xml 로 전개된 WebView 객체의 참조값을 얻어온다.
		WebView webview = (WebView)findViewById(R.id.webView);
		//웹 셋팅 객체 얻어오기
		WebSettings ws = webview.getSettings();
		//자바 스크립트 해석 가능하도록 설정
		ws.setJavaScriptEnabled(true);
		//시스템 웹브라우저가 아닌 우리가 정의한 Webview 를 사용하기 위한 설정
		webview.setWebViewClient(new WebViewClient());
		
		//원하는 url 주소에 요청을 한다.
		webview.loadUrl(url);
	}

	/**
	 * Set up the {@link android.app.ActionBar}.
	 */
	private void setupActionBar() {

		getActionBar().setDisplayHomeAsUpEnabled(true);

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.web_actibity, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// This ID represents the Home or Up button. In the case of this
			// activity, the Up button is shown. Use NavUtils to allow users
			// to navigate up one level in the application structure. For
			// more details, see the Navigation pattern on Android Design:
			//
			// http://developer.android.com/design/patterns/navigation.html#up-vs-back
			//
			NavUtils.navigateUpFromSameTask(this);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

}
