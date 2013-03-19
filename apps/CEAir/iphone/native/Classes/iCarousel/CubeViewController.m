//
//  CubeViewController.m
//  Cube
//
//  Created by 老邢 Thierry on 13-3-1.
//  Copyright (c) 2013年 Enway. All rights reserved.
//

#import "CubeViewController.h"
#define IS_IPAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

#define NUMBER_OF_ITEMS (IS_IPAD? 4: 4)
#define NUMBER_OF_VISIBLE_ITEMS 4
#define ITEM_SPACING 166.0f
#define INCLUDE_PLACEHOLDERS YES
@interface CubeViewController ()

@end

@implementation CubeViewController

@synthesize carousel;
@synthesize wrap;
@synthesize items;
@synthesize itemsText;

- (id)init
{
    if ((self = [super init]))
    {
        [self setUp];
    }
    return self;
}

- (void)setUp
{
	//set up data
	wrap = YES;
	self.items = [NSMutableArray array];
	for (int i = 0; i < NUMBER_OF_ITEMS; i++)
	{
		[items addObject:[NSNumber numberWithInt:i]];
	}
    self.itemsText = [NSMutableArray arrayWithObjects:@"航班动态",@"员工名片",@"航班地图",@"营销地图", nil];
}


- (void)dealloc
{
	//it's a good idea to set these to nil here to avoid
	//sending messages to a deallocated viewcontroller
	carousel.delegate = nil;
	carousel.dataSource = nil;
	
    [carousel release];
    [items release];
    [super dealloc];
}

#pragma mark -
#pragma mark View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    float viewWidth = self.view.frame.size.width;
    float viewHeight = self.view.frame.size.height;
    
    UIImageView *bg = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, viewWidth,viewHeight)];
    [bg setImage:[UIImage imageNamed:@"bg.png"]];
    [self.view addSubview:bg];
    [bg release];
    
    carousel = [[iCarousel alloc] initWithFrame:CGRectMake(0, 0, 250, 250)];
    carousel.center=self.view.center;
    //configure carousel
    carousel.decelerationRate = 0.5;
    carousel.type = iCarouselTypeCylinder;
    carousel.dataSource=self;
    carousel.delegate=self;
    [self.view addSubview:carousel];
    [carousel release];
    
    UIButton *naviMyFlight = [[UIButton alloc] initWithFrame:CGRectMake(0, viewHeight-48, 106.5,48)];
    [naviMyFlight setBackgroundImage:[UIImage imageNamed:@"navi_myf.png"] forState:UIControlStateNormal];
    [naviMyFlight addTarget:self action:@selector(naviClick:) forControlEvents:UIControlEventTouchUpInside];
    [naviMyFlight setTag:4];
    [self.view addSubview:naviMyFlight];
    [naviMyFlight release];
    
    UIButton *naviService = [[UIButton alloc] initWithFrame:CGRectMake(naviMyFlight.frame.size.width, viewHeight-48, 107,48)];
    [naviService setBackgroundImage:[UIImage imageNamed:@"navi_service.png"] forState:UIControlStateNormal];
    [naviService addTarget:self action:@selector(naviClick:) forControlEvents:UIControlEventTouchUpInside];
    [naviService setTag:5];
    [self.view addSubview:naviService];
    [naviService release];
    
    UIButton *naviMore = [[UIButton alloc] initWithFrame:CGRectMake(naviMyFlight.frame.size.width+naviService.frame.size.width, viewHeight-48, 106.5, 48)];
    [naviMore setBackgroundImage:[UIImage imageNamed:@"navi_more.png"] forState:UIControlStateNormal];
    [naviMore addTarget:self action:@selector(naviClick:) forControlEvents:UIControlEventTouchUpInside];
    [naviMore setTag:6];
    [self.view addSubview:naviMore];
    [naviMore release];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    self.carousel = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return NO;
}

#pragma mark -
#pragma mark iCarousel methods

- (NSUInteger)numberOfItemsInCarousel:(iCarousel *)carousel
{
    return [items count];
}

- (NSUInteger)numberOfVisibleItemsInCarousel:(iCarousel *)carousel
{
    //limit the number of items views loaded concurrently (for performance reasons)
    //this also affects the appearance of circular-type carousels
    return NUMBER_OF_VISIBLE_ITEMS;
}

- (UIView *)carousel:(iCarousel *)carousel viewForItemAtIndex:(NSUInteger)index reusingView:(UIView *)view
{
    
	UIButton *button = (UIButton *)view;
	if (button == nil)
	{
		//no button available to recycle, so create new one
		UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"%d.png",index+1]];
		button = [UIButton buttonWithType:UIButtonTypeCustom];
		button.frame = CGRectMake(0.0f, 0.0f, image.size.width, image.size.height);
		[button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
		[button setBackgroundImage:image forState:UIControlStateNormal];
        [button setBackgroundImage:image forState:UIControlStateHighlighted];
		button.titleLabel.font = [button.titleLabel.font fontWithSize:20];
		[button addTarget:self action:@selector(buttonTapped:) forControlEvents:UIControlEventTouchUpInside];
	}
	
	//set button label
//	[button setTitle:[NSString stringWithFormat:@"%@",[self.itemsText objectAtIndex:index]] forState:UIControlStateNormal];
	
	return button;

}


- (CGFloat)carouselItemWidth:(iCarousel *)carousel
{
    //usually this should be slightly wider than the item views
    return ITEM_SPACING;
}

- (CGFloat)carousel:(iCarousel *)carousel itemAlphaForOffset:(CGFloat)offset
{
	//set opacity based on distance from camera
    return 1.0f - fminf(fmaxf(offset, 0.0f), 1.0f);
}

- (CATransform3D)carousel:(iCarousel *)_carousel itemTransformForOffset:(CGFloat)offset baseTransform:(CATransform3D)transform
{
    //implement 'flip3D' style carousel
    transform = CATransform3DRotate(transform, M_PI / 8.0f, 0.0f, 1.0f, 0.0f);
    return CATransform3DTranslate(transform, 0.0f, 0.0f, offset * carousel.itemWidth);
}

- (BOOL)carouselShouldWrap:(iCarousel *)carousel
{
    return wrap;
}

#pragma mark -
#pragma mark Button tap event

- (void)buttonTapped:(UIButton *)sender
{
	//get item index for button
	NSInteger index = [carousel indexOfItemView:sender];
    NSDictionary *dic = [NSDictionary dictionaryWithObject:[NSNumber numberWithInt:index] forKey:@"index"];
    [self showTransitionAnim];
    [NativePage showWebView:dic];
}

-(void)naviClick:(UIButton *)sender
{
    NSDictionary *dic = [NSDictionary dictionaryWithObject:[NSNumber numberWithInt:[sender tag]] forKey:@"index"];
    // Animate transition with a flip effect
    [self showTransitionAnim];
    [NativePage showWebView:dic];
}

-(void)onAfterShow{
    [self showTransitionAnim];
}

-(void)showTransitionAnim
{
    CDVAppDelegate *cordovaAppDelegate =[[UIApplication sharedApplication] delegate];
    [UIView beginAnimations:nil context:NULL];
    [UIView setAnimationDuration:0.5];
    [UIView setAnimationTransition:UIViewAnimationTransitionFlipFromLeft forView:[cordovaAppDelegate window] cache:YES];
    [UIView commitAnimations];
}



@end
