package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewIpGeolocationEntityFunc func(client *FreeIpSDK, entopts map[string]any) FreeIpEntity

var NewJsonEntityFunc func(client *FreeIpSDK, entopts map[string]any) FreeIpEntity

