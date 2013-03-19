//
//  CameraController.h
//  TestZxing
//
//  Created by 老邢 Thierry on 13-2-26.
//  Copyright (c) 2013年 Enway. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZXingWidgetController.h"
#import "QRCodeReader.h"
#import "NativePage.h"
#import "CDVAppDelegate.h"

@interface CameraController : UIViewController<ZXingDelegate>

@property (nonatomic,retain) ZXingWidgetController *widController;

@end
