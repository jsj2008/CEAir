/*
 * Copyright 2013 @老邢Thierry.
 *  http://thierry-xing.iteye.com/
 */
package com.thierry.cube;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.CEAir.R;
import com.thierry.cube.TouchSurfaceView.CubeTouchListener;

public class CubeViewActivity extends Activity implements OnClickListener {

	private TouchSurfaceView mGLSurfaceView;
	private LinearLayout cube_layout;

	@Override
	public void onBackPressed() {
		// TODO Auto-generated method stub
		System.out.println("onBackPressed");
		new AlertDialog.Builder(CubeViewActivity.this).setTitle("提示").setMessage("确认要退出吗？")
				.setPositiveButton("确认", new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialoginterface, int i) {
						exit(CubeViewActivity.this);
					}
				}) // 添加一个按钮
				.setNegativeButton("取消", new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialoginterface, int i) {
					}
				}).show();
		return;
	}

	private ImageView navi_myflight;
	private ImageView navi_other;
	private ImageView navi_more;
	private int index;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Go fullscreen
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
		setContentView(R.layout.front);
		cube_layout = (LinearLayout) findViewById(R.id.cube_layout);
		mGLSurfaceView = new TouchSurfaceView(this);
		mGLSurfaceView.requestFocus();
		mGLSurfaceView.setFocusableInTouchMode(true);
		mGLSurfaceView.setCubeTouchListener(new CubeTouchListener() {

			@Override
			public void touch(int index) {
				// TODO Auto-generated method stub
				CubeViewActivity.this.index = index;
				returnToWeb();
			}
		});
		cube_layout.addView(mGLSurfaceView);
		navi_myflight = (ImageView) findViewById(R.id.navi_myflight);
		navi_other = (ImageView) findViewById(R.id.navi_other);
		navi_more = (ImageView) findViewById(R.id.navi_more);
		navi_myflight.setOnClickListener(this);
		navi_other.setOnClickListener(this);
		navi_more.setOnClickListener(this);
	}

	@Override
	protected void onResume() {
		super.onResume();
		mGLSurfaceView.onResume();
	}

	@Override
	protected void onPause() {
		super.onPause();
		mGLSurfaceView.onPause();
	}

	@Override
	public void onClick(View arg0) {
		// TODO Auto-generated method stub
		switch (arg0.getId()) {
		case R.id.navi_myflight:
			index = 4;
			break;
		case R.id.navi_other:
			index = 5;
			break;
		case R.id.navi_more:
			index = 6;
			break;
		}
		returnToWeb();
	}

	private void returnToWeb() {
		Intent intent = new Intent();
		intent.putExtra("index", index);
		setResult(RESULT_OK, intent);
		finish();
	}

	/**
	 * 完全退出程序
	 * 
	 * 注,必须添加以下权限 <!-- 关闭应用程序的权限 --> <uses-permission
	 * android:name="android.permission.RESTART_PACKAGES" /> <uses-permission
	 * android:name="android.permission.KILL_BACKGROUND_PROCESSES"/>
	 * 
	 * @param context
	 * @param packageName
	 */
	public static void exit(Context context) {
		int iSdk = Integer.valueOf(android.os.Build.VERSION.SDK);
		if (iSdk > 7) {
			// 2.2以上版本退出
			Intent startMain = new Intent(Intent.ACTION_MAIN);
			startMain.addCategory(Intent.CATEGORY_HOME);
			startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			context.startActivity(startMain);
			System.exit(0);// 退出程序
			// ActivityManager
			// activityMgr=(ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
			// activityMgr.restartPackage(context.getPackageName());
			// activityMgr.killBackgroundProcesses(context.getPackageName());
			// android.os.Process.killProcess(android.os.Process.myPid());
			// System.exit(0);//退出程序
		} else {
			// 2.1以下版本退出
			ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
			am.restartPackage(context.getPackageName());
			android.os.Process.killProcess(android.os.Process.myPid());
			// am.killBackgroundProcesses(context.getPackageName());
		}
	}
}
