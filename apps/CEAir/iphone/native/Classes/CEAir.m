//
//  MyAppDelegate.m
//  CEAir
//
//

#import "CEAir.h"


@implementation MyAppDelegate

- (id) init
{
	/*
     * If you need to do any extra app-specific initialization, you can do it here.
     **/
    return [super init];
}

/**
 * This is main kick off after the app inits, the views and Settings are setup here.
 */
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
    
    // The following code can be uncommented for use on iOS6 to prompt for access to Contacts
    // !! Note that the caller is responsible for releasing AddressBook !!
    ABAddressBookRef addressBook;
    if (&ABAddressBookCreateWithOptions != NULL) {
        CFErrorRef error = nil;
        // CFIndex status = ABAddressBookGetAuthorizationStatus();
        // NSLog(@"addressBook access: %lu", status);
        addressBook = ABAddressBookCreateWithOptions(NULL, &error);
        ABAddressBookRequestAccessWithCompletion(addressBook, ^(bool granted, CFErrorRef error) {
            // callback can occur in background, address book must be accessed on thread it was created on
            dispatch_sync (dispatch_get_main_queue (), ^{
                if (error) {
                    NSLog(@"Error getting address book");
                } else if (!granted) {
                    NSLog(@"Not allowed to get address book");
                } else {
                    NSLog(@"Got address book");
                }
            });
        });
    }
//    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound | UIRemoteNotificationTypeAlert)];
    
    /*
     * If you need to do any extra app-specific initialization, you can do it here.
     **/
    
    return ret;
}

/**
 * These functions handle moving to background and foreground and invoke the appropriate JavaScript functions in the UIWebView.
 */

- (void)applicationDidEnterBackground:(UIApplication *)application
{
	NSString *result = [super.viewController.webView stringByEvaluatingJavaScriptFromString:@"WL.App.BackgroundHandler.onAppEnteringBackground();"];
	if([result isEqualToString:@"hideView"]){
		[[self.viewController view] setHidden:YES];
	}
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
	NSString *result = [super.viewController.webView stringByEvaluatingJavaScriptFromString:@"WL.App.BackgroundHandler.onAppEnteringForeground();"];
	if([result isEqualToString:@"hideViewToForeground"]){
		[[self.viewController view] setHidden:NO];
	}
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
	[super applicationDidBecomeActive:application];
    /*
     * If you need to do any extra app-specific stuff, you can do it here.
     **/
}

//成功从APNS获取到Device Token
-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    NSLog(@"deviceToken is: %@", deviceToken);
    NSString* newToken = [deviceToken description];
    newToken = [newToken stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    newToken = [newToken stringByReplacingOccurrencesOfString:@" " withString:@""];
//    NSString *strPush = [NSString stringWithFormat:@"http://192.168.1.26:9000/WebService/addIosPushToken?tokenStr=%@",newToken];
//    NSLog(@"strPush :%@",strPush);
//    NSURLRequest *theRequest=[NSURLRequest requestWithURL:[NSURL URLWithString:strPush]
//                                              cachePolicy:NSURLRequestUseProtocolCachePolicy
//                                          timeoutInterval:2.0];
//    NSURLConnection *theConnection=[[[NSURLConnection alloc] initWithRequest:theRequest delegate:self] autorelease];
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    NSLog(@"didReceiveResponse");
}
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    NSLog(@"didReceiveData");
}
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError");
}
- (void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"connectionDidFinishLoading");
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
    // 处理推送消息
    UIAlertView *alert=[[UIAlertView alloc]initWithTitle:@"通知" message:[userInfo objectForKey:@"info"] delegate:self cancelButtonTitle:@"取消" otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    NSLog(@"Regist fail%@",error);
}

- (void)dealloc
{
	[ super dealloc ];
}

@end
