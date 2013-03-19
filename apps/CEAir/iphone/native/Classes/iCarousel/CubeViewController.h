//
//  CubeViewController.h
//  Cube
//
//  Created by 老邢 Thierry on 13-3-1.
//  Copyright (c) 2013年 Enway. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "iCarousel.h"
#import "NativePage.h"

@interface CubeViewController : UIViewController<iCarouselDataSource, iCarouselDelegate>

@property (nonatomic, retain) iCarousel *carousel;
@property (nonatomic, retain) NSMutableArray *items;
@property (nonatomic, retain) NSMutableArray *itemsText;
@property (nonatomic, assign) BOOL wrap;

@end
