//
//  CameraController.m
//  TestZxing
//
//  Created by 老邢 Thierry on 13-2-26.
//  Copyright (c) 2013年 Enway. All rights reserved.
//

#import "CameraController.h"

@interface CameraController ()

@end

@implementation CameraController
@synthesize widController = _widController;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    NSLog(@"");
    [super viewDidLoad];
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [self showCamera];
}

-(void)showCamera
{
    _widController = [[ZXingWidgetController alloc] initWithDelegate:self showCancel:YES OneDMode:NO];
    NSMutableSet *readers = [[NSMutableSet alloc ] init];
    QRCodeReader* qrcodeReader = [[QRCodeReader alloc] init];
    [readers addObject:qrcodeReader];
    [qrcodeReader release];
    _widController.readers = readers;
    [readers release];
    [self presentModalViewController:_widController animated:YES];
    [_widController release];
}

- (void)zxingController:(ZXingWidgetController*)controller didScanResult:(NSString *)result;
{
    NSLog(@"%@",result);
    [_widController dismissViewControllerAnimated:YES completion:nil];
    NSDictionary *dic = [NSDictionary dictionaryWithObject:result forKey:@"str"];
    [NativePage showWebView:dic];
}

- (void)zxingControllerDidCancel:(ZXingWidgetController*)controller
{
    [_widController dismissViewControllerAnimated:YES completion:nil];
    [NativePage showWebView:nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
    if(_widController )
    {
        [_widController release];
        _widController = nil;
    }
    [super dealloc];
}

@end
