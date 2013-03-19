package com.CEAir;

import android.content.Intent;
import android.os.Bundle;
import com.worklight.androidgap.WLDroidGap;

public class CEAir extends WLDroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// DeviceAuthManager.getInstance().setProvisioningDelegate(<Use default
		// ProvisioningDelegateImpl class or replace with your
		// IProvisioningDelegate implementation>);
		super.setIntegerProperty("splashscreen", R.drawable.loading);
		super.loadUrl(getWebMainFilePath());
	}
}
