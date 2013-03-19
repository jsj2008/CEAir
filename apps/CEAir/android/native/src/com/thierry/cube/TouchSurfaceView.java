/*
 * Copyright 2013 @老邢Thierry.
 *  http://thierry-xing.iteye.com/
 */
package com.thierry.cube;

import java.io.IOException;
import java.io.InputStream;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.opengl.GLSurfaceView;
import android.opengl.GLU;
import android.opengl.GLUtils;
import android.util.AttributeSet;
import android.view.MotionEvent;

import com.CEAir.R;

/**
 * Implement a simple rotation control.
 * 
 */
class TouchSurfaceView extends GLSurfaceView {

	private final float TOUCH_SCALE_FACTOR = 180.0f / 200;// 180.0f / 320;
	private final float TRACKBALL_SCALE_FACTOR = 18.0f;// 18.0f
	private CubeRenderer mRenderer;
	private float mPreviousX;
	private float mPreviousY;

	private boolean axesX = true;

	public void setAxesX(boolean b) {
		axesX = b;
	}

	public TouchSurfaceView(Context context, AttributeSet set) {
		super(context, set);
		mRenderer = new CubeRenderer(context);
		setRenderer(mRenderer);
		// 设置为手动控制渲染
	}

	public TouchSurfaceView(Context context) {
		super(context);
		setZOrderOnTop(true);
		setEGLConfigChooser(8, 8, 8, 8, 16, 0);
		getHolder().setFormat(PixelFormat.TRANSLUCENT);
		mRenderer = new CubeRenderer(context);
		setRenderer(mRenderer);
		// 设置为手动控制渲染
		setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);
	}

	@Override
	public boolean onTrackballEvent(MotionEvent e) {

		float dx = Math.abs(e.getX() * TRACKBALL_SCALE_FACTOR);
		float dy = Math.abs(e.getY() * TRACKBALL_SCALE_FACTOR);
		if (dx > dy && dx > 2.5) {
			mRenderer.mAngleX += e.getX() * TRACKBALL_SCALE_FACTOR;
			mRenderer.mAngleY += e.getY() * TRACKBALL_SCALE_FACTOR;
			this.setAxesX(true);
		} else if (dx < dy && dy > 2.5) {
			mRenderer.mAngleX += e.getX() * TRACKBALL_SCALE_FACTOR;
			mRenderer.mAngleY += e.getY() * TRACKBALL_SCALE_FACTOR;
			this.setAxesX(false);
		}
		requestRender();
		return true;
	}

	interface CubeTouchListener {
		public void touch(int index);
	}

	CubeTouchListener l;

	public void setCubeTouchListener(CubeTouchListener l) {
		this.l = l;
	}

	@Override
	public boolean onTouchEvent(MotionEvent e) {
		float x = e.getX();
		float y = e.getY();
		switch (e.getAction()) {
		case MotionEvent.ACTION_MOVE:
			System.out.println("ACTION_MOVE");
			float dx = x - mPreviousX;
			float dy = y - mPreviousY;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 2.5) {
				mRenderer.mAngleX += dx * TOUCH_SCALE_FACTOR;
				mRenderer.mAngleY += dy * TOUCH_SCALE_FACTOR;
				this.setAxesX(true);
			}
			requestRender();
			break;
		case MotionEvent.ACTION_UP:
			System.out.println(mRenderer.mAngleX);
			// 手松开时的转动角度
			float startA = mRenderer.mAngleX;
			// 如果是点击，没有滑动,返回点击事件
			if (Math.abs(startA) % 90 == 0) {
				int index = 0;
				if (mRenderer.mAngleX == 0) {
					index = 0;
				} else if (mRenderer.mAngleX == -90 || mRenderer.mAngleX == 270) {
					index = 1;
				} else if (mRenderer.mAngleX == 180 || mRenderer.mAngleX == -180) {
					index = 2;
				} else if (mRenderer.mAngleX == -270 || mRenderer.mAngleX == 90) {
					index = 3;
				}
				l.touch(index);
				break;
			}
			// 回位后的角度
			float endA = 0;
			if ((mRenderer.mAngleX > 0 && mRenderer.mAngleX < 45) || (mRenderer.mAngleX < 0 && mRenderer.mAngleX > -45)) {
				endA = 0;
			} else if ((mRenderer.mAngleX > 45 && mRenderer.mAngleX <= 90)
					|| (mRenderer.mAngleX > 90 && mRenderer.mAngleX <= 135)) {
				endA = 90;
			} else if ((mRenderer.mAngleX > 135 && mRenderer.mAngleX <= 180)
					|| (mRenderer.mAngleX > 180 && mRenderer.mAngleX <= 225)) {
				endA = 180;
			} else if ((mRenderer.mAngleX > 225 && mRenderer.mAngleX <= 270)
					|| (mRenderer.mAngleX > 270 && mRenderer.mAngleX <= 315)) {
				endA = 270;
			} else if (mRenderer.mAngleX > 315) {
				endA = 360;
			} else if ((mRenderer.mAngleX < -45 && mRenderer.mAngleX >= -90)
					|| (mRenderer.mAngleX < -90 && mRenderer.mAngleX >= -135)) {
				endA = -90;
			} else if ((mRenderer.mAngleX < -135 && mRenderer.mAngleX >= -180)
					|| (mRenderer.mAngleX < -180 && mRenderer.mAngleX >= -225)) {
				endA = -180;
			} else if ((mRenderer.mAngleX < -225 && mRenderer.mAngleX >= -270)
					|| (mRenderer.mAngleX < -270 && mRenderer.mAngleX >= -315)) {
				endA = -270;
			} else if (mRenderer.mAngleX < -315) {
				endA = -360;
			} else {
				endA = 0;
			}
			Animate(startA, endA);
			break;
		}
		mPreviousX = x;
		mPreviousY = y;
		System.out.println("end mRenderer.mAngleX" + mRenderer.mAngleX);
		return true;
	}

	// 回位动画
	private void Animate(float startA, float endA) {
		System.out.println("startA" + startA);
		System.out.println("endA" + endA);
		System.out.println("mRenderer.mAngleX" + mRenderer.mAngleX);
		float Afactor = Math.abs(endA - startA) / 100;
		for (int i = 0; i < 99; i++) {
			if (startA < endA)
				mRenderer.mAngleX += Afactor;
			else
				mRenderer.mAngleX -= Afactor;
			Thread t = Thread.currentThread();
			try {
				// 增加动画时间
				t.sleep(2);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			requestRender();
			// 最后一次循环，设置为回位角度
			if (i == 98) {
				mRenderer.mAngleX = endA;
				requestRender();
			}
		}
		// 如果绝对值大于360，重置为初始角度
		if (Math.abs(endA) == 360) {
			mRenderer.mAngleX = 0;
		}
	}

	/**
	 * Render a cube.
	 */
	class CubeRenderer implements GLSurfaceView.Renderer {

		public CubeRenderer(Context context) {
			mContext = context;
			mCube = new Cube();
		}

		public void onDrawFrame(GL10 gl) {
			gl.glTexEnvx(GL10.GL_TEXTURE_ENV, GL10.GL_TEXTURE_ENV_MODE, GL10.GL_MODULATE);
			gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
			gl.glClearColor(0f, 0f, 0f, 0f);
			gl.glLoadIdentity();

			gl.glTranslatef(0.0f, 0.0f, -5.0f);
			gl.glRotatef(mAngleX, 0.0f, 1.0f, 0.0f);

			gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
			gl.glEnableClientState(GL10.GL_TEXTURE_COORD_ARRAY);
			mCube.draw(gl);
			gl.glLoadIdentity();
		}

		public void onSurfaceChanged(GL10 gl, int width, int height) {

			gl.glViewport(0, 0, width, height);
			gl.glMatrixMode(GL10.GL_PROJECTION);
			gl.glLoadIdentity();
			GLU.gluPerspective(gl, 45.0f, (float) width / (float) height, 0.1f, 100.0f);
			gl.glViewport(0, 0, width, height);

			gl.glMatrixMode(GL10.GL_MODELVIEW);
			gl.glLoadIdentity();

		}

		public void onSurfaceCreated(GL10 gl, EGLConfig config) {
			gl.glClearColor(0.0f, 0.0f, 0.0f, 0.0f);
			gl.glShadeModel(GL10.GL_SMOOTH);
			gl.glClearDepthf(1.0f);
			gl.glEnable(GL10.GL_DEPTH_TEST);
			gl.glEnable(GL10.GL_POLYGON_SMOOTH_HINT);
			gl.glDepthFunc(GL10.GL_LEQUAL);

			loadTexture(gl, 1, R.drawable.a);
			loadTexture(gl, 2, R.drawable.c);
			loadTexture(gl, 3, R.drawable.d);
			loadTexture(gl, 4, R.drawable.b);

		}

		// 加载纹理贴图
		public void loadTexture(GL10 gl, int no, int drawableId) {
			int[] textures = new int[1];
			switch (no) {
			case 1:
				gl.glGenTextures(1, textures, 0);
				Cube.mTextureID_front = textures[0];
				gl.glBindTexture(GL10.GL_TEXTURE_2D, Cube.mTextureID_front);
				break;
			case 2:
				gl.glGenTextures(1, textures, 0);
				Cube.mTextureID_back = textures[0];
				gl.glBindTexture(GL10.GL_TEXTURE_2D, Cube.mTextureID_back);
				break;
			case 3:
				gl.glGenTextures(1, textures, 0);
				Cube.mTextureID_left = textures[0];
				gl.glBindTexture(GL10.GL_TEXTURE_2D, Cube.mTextureID_left);
				break;
			case 4:
				gl.glGenTextures(1, textures, 0);
				Cube.mTextureID_right = textures[0];
				gl.glBindTexture(GL10.GL_TEXTURE_2D, Cube.mTextureID_right);
				break;
			}

			gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_MIN_FILTER, GL10.GL_NEAREST);
			gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_MAG_FILTER, GL10.GL_LINEAR);
			gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_WRAP_S, GL10.GL_CLAMP_TO_EDGE);
			gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_TEXTURE_WRAP_T, GL10.GL_CLAMP_TO_EDGE);
			gl.glTexEnvf(GL10.GL_TEXTURE_ENV, GL10.GL_TEXTURE_ENV_MODE, GL10.GL_REPLACE);

			InputStream is = mContext.getResources().openRawResource(drawableId);
			Bitmap bitmapTmp;
			try {
				bitmapTmp = BitmapFactory.decodeStream(is);
			} finally {
				try {
					is.close();
				} catch (IOException e) {
					// Ignore.
				}
			}
			GLUtils.texImage2D(GL10.GL_TEXTURE_2D, 0, bitmapTmp, 0);
			bitmapTmp.recycle();

		}

		private Cube mCube;
		// private int mTextureID;
		private Context mContext;

		public float mAngleX;
		public float mAngleY;

	}

}
