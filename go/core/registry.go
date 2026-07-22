package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewIpGeolocationEntityFunc func(client *FreeIpSDK, entopts map[string]any) FreeIpEntity

var NewJsonEntityFunc func(client *FreeIpSDK, entopts map[string]any) FreeIpEntity

